const path = require('path'); //项目中使用引入文件有时候路径比较深，需要使用"../../../xx.js"这种类似的路径引入，这种方式比较笨，可以使用webpack的别名alias配置来解决。
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  // Webpack链，用于配置 loader rules 和 plugins。对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  //会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    // config.resolve.symlinks(true) // 修复热更新失效
    config.resolve.alias.set('@', resolve('src')).set('@views', resolve('src/views'));
  },
};
