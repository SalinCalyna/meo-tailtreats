/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // ช่วยตรวจสอบโค้ด React ที่ผิดพลาด
    trailingSlash: false, // เปิด/ปิดการใช้ "/" ที่ท้าย URL
    images: {
      domains: ["example.com"], // อนุญาตโหลดรูปภาพจาก domain ที่ระบุ
    },
  };
  
  module.exports = nextConfig;
  