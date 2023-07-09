/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        custom: {
          "gray-secondary": "#202024",
          "gray-primary": "#121214",

          "gray-light": "#E1E1E6"
        }
      }
    }
  }
  // plugins: [require("@tailwindcss/forms")]
};
