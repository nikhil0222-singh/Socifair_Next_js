/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Authentication endpoints
      {
        source: '/api/wakapi/login',
        destination: 'http://localhost:8080/login',
      },
      {
        source: '/api/wakapi/signup',
        destination: 'http://localhost:8080/signup',
      },
      {
        source: '/api/wakapi/logout',
        destination: 'http://localhost:8080/logout',
      },
      // API v1 endpoints
      {
        source: '/api/wakapi/v1/:path*',
        destination: 'http://localhost:8080/api/v1/:path*',
      },
      // WakaTime compatibility endpoints
      {
        source: '/api/wakapi/compat/:path*',
        destination: 'http://localhost:8080/compat/:path*',
      },
      // Other API endpoints
      {
        source: '/api/wakapi/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;