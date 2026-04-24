import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			"gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
  		},
  		fontFamily: {
  			sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
  			display: [
  				"var(--font-jakarta)",
  				"Plus Jakarta Sans",
  				"system-ui",
  				"sans-serif",
  			],
  		},
  		colors: {
  			brand: {
  				violet: "#3D2B8E",
  				pink: "#E5305B",
  				light: "#F7F5FF",
  				dark: "#1A1035",
  			},
  			"text-primary": "#1A1035",
  			"text-muted-custom": "#6B6880",
  			"gray-soft": "#F4F4F6",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: 'hsl(var(--destructive))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			"3xl": "1.5rem",
  			"4xl": "2rem",
  		},
  		boxShadow: {
  			"soft": "0 2px 18px -4px rgba(26, 16, 53, 0.08), 0 6px 24px -6px rgba(26, 16, 53, 0.06)",
  			"card": "0 4px 32px -8px rgba(26, 16, 53, 0.12), 0 0 0 1px rgba(61, 43, 142, 0.06)",
  			"glow-pink": "0 0 0 1px rgba(229, 48, 91, 0.12), 0 20px 50px -20px rgba(229, 48, 91, 0.35)",
  			"nav": "0 1px 0 rgba(26, 16, 53, 0.06), 0 8px 32px -12px rgba(26, 16, 53, 0.08)",
  		},
  		keyframes: {
  			"float-slow": {
  				"0%, 100%": { transform: "translateY(0) scale(1)" },
  				"50%": { transform: "translateY(-12px) scale(1.02)" },
  			},
  			shimmer: {
  				"0%": { backgroundPosition: "200% 0" },
  				"100%": { backgroundPosition: "-200% 0" },
  			},
  			"nav-progress": {
  				"0%": { transform: "translateX(-120%)" },
  				"100%": { transform: "translateX(420%)" },
  			},
  		},
  		animation: {
  			"float-slow": "float-slow 12s ease-in-out infinite",
  			shimmer: "shimmer 8s linear infinite",
  			"nav-progress": "nav-progress 1.15s ease-in-out infinite",
  		},
  	}
  },
  plugins: [tailwindcssAnimate],
};
export default config;
