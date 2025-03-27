# web桌面应用管理后台项目脚手架

## 技术栈
- vite
- React
- semi-ui
- jotai
- ahooks
- typescript

## 项目架构
使用monorepo+pnpm来管理packages，初始化相关配置和文件(package.json, .gitngore, .npmrc等)

## 工程结构
- app
    - merchant-platform // 商户管理平台
- packages // 不同app应用之间可共享的
- utils // 全局共享的工具类
- components // 全局通用的自定义组件

