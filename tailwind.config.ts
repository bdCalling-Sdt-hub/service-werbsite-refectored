import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        2: "2.5px",
      },
      colors: {
        "mastard-50": "#fdf9e6",
        "mastard-100": "#faebb0",
        "mastard-200": "#f8e28a",
        "mastard-300": "#f4d554",
        "mastard-400": "#f2cd33",
        "mastard-500": "#efc000",
        "mastard-600": "#d9af00",
        "mastard-700": "#aa8800",
        "mastard-800": "#836a00",
        "mastard-900": "#645100",

        "green-50": "#eaeff1",
        "green-100": "#bdcdd4",
        "green-200": "#9db5bf",
        "green-300": "#7093a2",
        "green-400": "#557e90",
        "green-500": "#2a5e74",
        "green-600": "#26566a",
        "green-700": "#1e4352",
        "green-800": "#173440",
        "green-900": "#122731",

        "black-50": "#e9e9e9",
        "black-100": "#bababa",
        "black-200": "#999999",
        "black-300": "#6b6b6b",
        "black-400": "#4e4e4e",
        "black-500": "#222222",
        "black-600": "#1f1f1f",
        "black-700": "#181818",
        "black-800": "#131313",
        "black-900": "#0e0e0e",

        // "white-50": "#ffffff",
        // "white-100": "#f7f7f7",
        // "white-200": "#eaeaea",
        // "white-300": "#d9d9d9",
        // "white-400": "#bfbfbf",
        // "white-500": "#a6a6a6",
        // "white-600": "#8c8c8c",
        "white-700": "#b5b5b5",
        // "white-800": "#595959",
        // "white-900": "#404040",
      },
      backgroundImage: {
        serviceCartBG: "url('/cartBG.png')",
      },
    },
  },
  plugins: [],
};
export default config;
