/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.notion.so' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
    ],
  },
};

export default nextConfig;
