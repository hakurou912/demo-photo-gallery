/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            pathname: '/v0/b/fir-a95ec.appspot.com/o/**',
          },
        ],
    },
};

export default nextConfig;
