# 年月日时分的日期选择器组件

仓库地址：https://github.com/xml1978157910/taro-picker-time.git

基于 Taro3.x 使用 vue 框架

## 功能介绍

-   src
    -   data 根据起止时间，得出时间选择器的数据，无无效数据，不能设置默认
    -   index 根据起止时间，得出起止时间前后20年的数据，有无效数据，滑动到无效数据返回到(默认时间 || 起止时间)，能设置默认时间

## 项目运行
    git clone http://gitlab6.sys.wanmei.com/portal-group/future-wechat.git

    npm install

    npm run dev:weapp //本地调试，用微信开发者工具打开dist目录

    npm run build:weapp //打包
