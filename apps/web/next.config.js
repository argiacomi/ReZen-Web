const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  transpilePackages: ['design-system'],
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.resolve.alias = {
      '@': path.resolve(__dirname, './node_modules/design-system'),
      '@components': path.resolve(__dirname, './node_modules/design-system/components'),
      '@hooks': path.resolve(__dirname, './node_modules/design-system/lib/hooks'),
      '@utils': path.resolve(__dirname, './node_modules/design-system/lib/utils'),
      '@icons': path.resolve(__dirname, './node_modules/design-system/lib/icons'),
      '@styles': path.resolve(__dirname, './node_modules/design-system/styles'),
      '@transitions': path.resolve(__dirname, './node_modules/design-system/components/utils/Transitions')
    };

    return config;
  }
};

module.exports = nextConfig;
