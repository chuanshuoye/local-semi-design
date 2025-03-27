# web桌面应用管理后台项目

基于monorepo架构的商户管理平台项目脚手架

## 技术栈

- Vite
- React
- Semi Design UI
- Jotai
- ahooks
- TypeScript
- pnpm

## 项目结构

```
├── app                       # 应用目录
│   └── merchant-platform     # 商户管理平台
├── packages                  # 共享包
│   └── request               # 请求库
├── utils                     # 全局共享工具类
├── components                # 全局通用自定义组件
│   └── StatusTag             # 状态标签组件
└── README.md                 # 项目说明
```

## Jotai 状态管理

本项目使用 Jotai 作为轻量级状态管理方案。Jotai 采用原子化的状态管理方式，相比 Redux 更加简洁和高效。

### 基本用法

```tsx
// 定义原子状态
import { atom, useAtom } from 'jotai';

// 创建一个原子
const countAtom = atom(0);

// 在组件中使用
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### 派生状态

```tsx
// 基于其他atom创建派生atom
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 在组件中使用
function DoubleCounter() {
  const [doubleCount] = useAtom(doubleCountAtom);
  
  return <p>Double Count: {doubleCount}</p>;
}
```

### 异步状态

```tsx
// 创建异步atom
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// 在组件中使用
function User() {
  const [user] = useAtom(userAtom);
  
  if (user.loading) return <p>Loading...</p>;
  if (user.error) return <p>Error: {user.error.message}</p>;
  return <p>User: {user.data.name}</p>;
}
```

### 项目中的示例

商户列表页面(`app/merchant-platform/src/pages/MerchantList.tsx`)展示了Jotai的完整使用示例，包括：

1. 基本状态管理
2. 派生状态
3. 与UI组件集成
4. 与API请求结合

## 开发指南

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 启动开发服务

```bash
# 启动商户管理平台
pnpm dev:merchant
```

### 构建

```bash
# 构建商户管理平台
pnpm build:merchant
```

## 新增应用

在app目录下创建新的应用目录，按照类似merchant-platform的结构进行开发。