/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", // for Cloudinary images
      "example.com", // remove this later if unused
      "localhost", // optional for dev testing
    ],
  },
};

export default nextConfig;
