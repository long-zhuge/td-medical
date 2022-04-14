export default {
  esm: 'babel',
  cjs: 'babel',
  // extractCSS: true,
  // disableTypeCheck: true,
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ["import", {
      libraryName: '@ant-design/icons',
      libraryDirectory: 'es/icons',
      camel2DashComponentName: false
    }, 'ant-design-icons'],
  ],
};
