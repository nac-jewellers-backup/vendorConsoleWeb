/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: 'https://rqc4db3lq5.execute-api.us-east-2.amazonaws.com/dev',
        API_KEY: '8DCiyiPd0f6ojQaYPwsH42IpPacBXf976Yt4TCIr'
    }
};

module.exports = nextConfig;