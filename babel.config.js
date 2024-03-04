module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@fps/minip-uikit',
        style: true,
      },
    ],
  ],
};
