/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {

    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react').replace('index.js', ''),
      ['prop-types']: require.resolve('prop-types').replace('index.js', ''),
    };

    return config;
  },
}
