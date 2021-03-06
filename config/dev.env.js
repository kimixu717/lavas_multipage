/**
 * @file 开发环境相关配置文件
 * @author KimiXu(xuyujin@banggood.cn)
 */

var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
});
