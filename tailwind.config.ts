import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0B",
        surface: {
          DEFAULT: "#141416",
          2: "#1C1C1F",
        },
        border: "#2A2A2E",
        ink: {
          DEFAULT: "#F4F4F5",
          muted: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#E8FF47",
          ink: "#0A0A0B",
        },
        core: "#5EEAD4",
        slang: "#FB7185",
        warn: "#FBBF24",
        ok: "#4ADE80",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "44px", fontWeight: "700" }],
        h1: ["32px", { lineHeight: "36px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "28px", fontWeight: "600" }],
        h3: ["18px", { lineHeight: "22px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px" }],
        caption: ["13px", { lineHeight: "18px" }],
      },
      borderRadius: {
        card: "12px",
        chip: "8px",
        pill: "999px",
      },
      transitionDuration: {
        enter: "120ms",
        hover: "100ms",
        unlock: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
