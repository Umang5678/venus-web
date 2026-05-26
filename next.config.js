/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", // for Cloudinary images
      "example.com", // remove this later if unused
      "localhost", // optional for dev testing
    ],
  },
  experimental: {
    // Disable webpack build workers to prevent "Out of Memory" crashes on low RAM devices
    webpackBuildWorker: false,
  },
};

export default nextConfig;
