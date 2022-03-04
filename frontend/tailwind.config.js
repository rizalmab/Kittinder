module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
      boxShadow: {
        vxl: "0px 10px 53px 0px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
