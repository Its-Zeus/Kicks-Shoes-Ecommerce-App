import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors : {
      blue : "#4A69E2",
      yellow: "#FFA52F",
      white: "#FFF",
      fawhite: "#FAFAFA",
      gray: "#E7E7E3",
      graymain: "#70706E",
      darkgrey: "#232321",
      
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        '3xl': '1800px',
      }
    },
  },
  plugins: [require('daisyui'),require('@tailwindcss/forms')],

};
export default config;
