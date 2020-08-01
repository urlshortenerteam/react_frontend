const { override, fixBabelImports, addWebpackPlugin,addLessLoader } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = override(
   addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars:{
      '@primary-color':'#7f6cf5',
      '@link-color':'#7f6cf5',
      '@heading-color':'#ffffff',
      '@text-color':'#ffffff',
      '@text-color-secondary':'#cccccc',
      '@skeleton-to-color':'#8E44AD',
      '@skeleton-color':'#34495E',
      '@background-color-light':'#7f6cf5',
      '@background-color-base':'#141414',
      '@component-background':'#012a50',
    }
  }
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
 }),
);