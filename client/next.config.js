/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // TODO: Удалить домены
    domains: [
      "placehold.co",
      "secureservercdn.net",
      "api.qrserver.com",
      // "http://localhost:3333",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
