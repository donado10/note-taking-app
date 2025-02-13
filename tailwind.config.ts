import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "notes-blue-primary": "#2547D0",
        "notes-blue-secondary": "#335CFF",
        "notes-blue-third": "#EBF1FF",
        "notes-green-primary": "#21C16B",
        "notes-green-secondary": "#D1FBE9",
        "notes-red-primary": "#FB3748",
        "notes-red-secondary": "#FFD5D8",
      },
      fontFamily: {
        "notes-interBold": "var(--font-inter-bold)",
        "notes-interMedium": "var(--font-inter-medium)",
        "notes-interRegular": "var(--font-inter-regular)",
        "notes-interSemiBold": "var(--font-inter-semi-bold)",
        "notes-notoBold": "var(--font-noto-bold)",
        "notes-notoMedium": "var(--font-noto-medium)",
        "notes-notoRegular": "var(--font-noto-regular)",
        "notes-notoSemiBold": "var(--font-noto-semi-bold)",
        "notes-sourceBold": "var(--font-source-bold)",
        "notes-sourceMedium": "var(--font-source-medium)",
        "notes-sourceRegular": "var(--font-source-regular)",
        "notes-sourceSemiBold": "var(--font-source-semi-bold)",
      },
      screens: {
        xs: "0px",
        md: "768px",
        xl: "1060px",
      },
    },
  },
  plugins: [],
} satisfies Config;
