module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 11'],
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        modules: false,
      },
    ],
    '@babel/react',
    '@babel/flow',
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/transform-modules-commonjs',
  ],
};
