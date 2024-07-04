/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_API_HOSTNAME],
  },
};

module.exports = nextConfig;
