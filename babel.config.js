const babelConfig = {
  // 相当于plugins的一个集合，即插件集，就不需要在plugins中一个个插件的配置了
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry', // 如果引入了@babel/polyfill，这个属性可以使@babel/polyfill按需引入
        corejs: 2,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import", ["@babel/plugin-transform-runtime"]], // @babel/runtime中的插件
}

module.exports = babelConfig
