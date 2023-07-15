/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PINATA_KEY: process.env.PINATA_KEY,
    PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
  },
}
require('dotenv').config({ path: '.env' });
module.exports = nextConfig
