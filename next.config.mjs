/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            pathname: '/v0/b/プロジェクトID/o/**',
          },
        ],
    },
};

export default nextConfig;
