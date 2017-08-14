# new_chic_pwa

## 请使用yarn替代部分npm命令
- 替换yarn镜像：yarn config set registry 'https://registry.npm.taobao.org'

- 安装工程依赖
    ``` bash
    yarn
    ```
- 更新工程依赖
  ``` bash
  yarn upgrade [package]
  ```
- 删除工程依赖
  ``` bash
  yarn remove [package]
  ```
- 在 localhost:9000 上启动带有热更新机制的开发服务器
  ``` bash
  npm run dev
  ```
- 在 localhost:9009 上启动服务器,用于手机上查看控制台报错
  ``` bash
  npm run vconsole
  ```
- 检查您的代码是否规范
  ``` bash
  npm run lint
  ```
- 构建线上生产环境产物
  ``` bash
  npm run build
  ```
- 构建线上生产环境产物并且查看构建分析报告
  ``` bash
  npm run build --report
  ```

## 使用eslint standard规则规范代码，额外的规则如下：
- 使用2个空格代表一个tab
- js结尾不写分号

## 使用stylus
- 不需要额外添加浏览器前缀(autoprefixer处理)
- 不使用rem方案，直接写px
- 使用基于flex的弹性布局，少使用浮动，布局需兼容ipad

## vuex逻辑控制
- 暂时不做数据持久化
- 静默原则：部分页面进行静默更新，比如个人中心页，进来不要立即展示loading，静默更新数据
- 退出登录清空所有跟用户相关的数据，如订单列表等
