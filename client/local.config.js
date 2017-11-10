module.exports = {
  // devServer
  // proxy: Array or Function
  // 当为函数时接受两个形参[server, proxyMiddleware],
  // 当为数组时 `path`的设置参考http://expressjs.com/en/4x/api.html#app.use, `config`的设置参考https://www.npmjs.com/package/http-proxy-middleware
  devServer: {
    host: '0.0.0.0',//host: 'vis.pku.edu.cn',
    port: 20722//,
    //proxy: [ {
    //  path: '/static', // your backend url path rules
    //  config: {
    //    target: 'http://vis.pku.edu.cn:15025',
    //    changeOrigin: true,
    //    logLevel: 'debug',
    //    ws: true
    //  }
    //} ]
  }
}
