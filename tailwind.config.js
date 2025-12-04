/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "#27272a",
                input: "#27272a",
                ring: "#ffffff",
                background: "#000000",
                foreground: "#ffffff",
                primary: {
                    DEFAULT: "#ffffff",
                    foreground: "#000000",
                },
                secondary: {
                    DEFAULT: "#18181b",
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#18181b",
                    foreground: "#a1a1aa",
                },
                card: {
                    DEFAULT: "#000000",
                    foreground: "#ffffff",
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                "grid-flow": "grid-flow 20s linear infinite",
                "spin-slow": "spin 3s linear infinite",
                "float": "float 8s ease-in-out infinite",
                "float-subtle": "float 6s ease-in-out infinite",
                "float-delayed": "float 12s ease-in-out infinite reverse",
                "pulse-square": "pulse-square 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "page-enter": "page-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-down": "slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "text-reveal": "text-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "warp-out": "warp-out 0.6s cubic-bezier(0.7, 0, 0.84, 0) forwards",
                "slide-up-stagger": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards",
                "shine": "shine 4s linear infinite",
            },
            keyframes: {
                "grid-flow": {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(40px)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-square": {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.5", transform: "scale(0.9)" },
                },
                "page-enter": {
                    "0%": { opacity: "0", transform: "translateY(20px) scale(0.98)" },
                    "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
                },
                "slide-down": {
                    "0%": { transform: "translateY(-100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" }
                },
                "text-reveal": {
                    "0%": { opacity: "0", transform: "translateY(10px)", filter: "blur(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" }
                },
                "warp-out": {
                    "0%": { opacity: "1", transform: "scale(1)", filter: "blur(0px)" },
                    "100%": { opacity: "0", transform: "scale(1.1)", filter: "blur(20px)" },
                },
                "slide-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "shine": {
                    "0%": { backgroundPosition: "200% center" },
                    "100%": { backgroundPosition: "-200% center" }
                }
            }
        },
    },
    plugins: [],
}
