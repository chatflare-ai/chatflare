import type { Config } from "tailwindcss";
import {
  animations,
  palettes,
  rounded,
  shade,
  components,
} from "@tailus/themer";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tailus/themer/dist/components/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: palettes.oz,
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    animations,
    rounded,
    shade,
    components,
  ],
};
export default config;
