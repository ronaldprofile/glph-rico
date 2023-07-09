/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        custom: {
          "gray-secondary": "#202024",
          "gray-primary": "#121214",

          "gray-light": "#E1E1E6",
          "preview-content": "rgb(40, 39, 46)",
          "preview-content-text": " rgb(168, 168, 179)"
        }
      }
    }
  }
  // plugins: [require("@tailwindcss/forms")]
};
