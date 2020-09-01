const { override, fixBabelImports, addWebpackPlugin,addLessLoader } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = override(
   addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  addLessLoader({
    lessOptions:{
    javascriptEnabled: true,
    modifyVars:{
      '@primary-color':'#b175ca',
    }
    }
  }
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
 }),
);