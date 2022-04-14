import { defineConfig } from 'dumi';

const path = require('path');

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'td-medical',
  // description: '病历模板组件',
  favicon: '/logo.png',
  logo: '/logo.png',
  extraBabelPlugins: [
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true,}, 'antd'],
    ["import", {
      libraryName: '@ant-design/icons',
      libraryDirectory: 'es/icons',
      camel2DashComponentName: false
    }, 'ant-design-icons'],
  ],
  alias: {
    'td-medical': path.resolve(__dirname, 'src/'),
  },
  mode: 'site',
  proxy: {
    '/app': {
      target: 'http://rap2api.taobao.org',
      changeOrigin: true,
    },
  },
});
