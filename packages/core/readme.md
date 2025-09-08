# Lcsy Design 组件库

个人用来练习React而实现的组件库项目

## 快速开始

### 安装依赖
```bash
pnpm add lcsy-design
```
### 示例
```tsx
// Select 组件
import { Select } from 'lcsy-design';

const Demo = (
    <Select
      options={[
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
          { label: "选项3", value: "3" },
      ]}
      defaultValue="1"
      onChange={(value) => {
          console.log(value);
      }}
    />
);

```

## 项目结构

```bash
├── apps/          # 演示应用
│   ├── docs       # 组件文档（还不完善）
│   └── playground # 开发沙箱
├── packages/      # 核心包
│   ├── core       # 核心组件位置（rslib打包）
│   └── rollup     # 复制core的打包，用来练习rollup
└── turbo.json     # 构建流水线

```
## 特性

✅ Monorepo架构（TurboRepo + pnpm workspace）  
✅ 使用 TypeScript 进行书写并提供了完整的定义文件  
✅ 多打包器支持（RSLib/Rollup）  
✅ 环境演示（playground）  
✅ 默认支持基于 ES modules 的 tree shaking。
