module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // สีพื้นหลังน้ำเงิน
        secondary: "#FBBF24", // สีเหลือง
      },
    },
  },
  plugins: [],
};
