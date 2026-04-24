import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./lib/user-repo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  trustHost: true,
  pages: { signIn: "/auth/login", error: "/auth/login" },
  providers: [
    Credentials({
      name: "email",
      credentials: {
        email: { label: "E-mail" },
        password: { label: "Mot de passe" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await getUserByEmail(String(credentials.email));
        if (!user) return null;
        const ok = await compare(
          String(credentials.password),
          user.passwordHash,
        );
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = (user as { id: string }).id;
        token.sub = (user as { id: string }).id;
        token.email = user.email;
      }
      if (trigger === "update" && session && typeof session === "object" && "user" in session) {
        const u = (session as { user?: { email?: string | null } }).user;
        if (u?.email) {
          token.email = u.email;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && (token as { id?: string }).id) {
        (session.user as { id: string }).id = (token as { id: string }).id;
      }
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
