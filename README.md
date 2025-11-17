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

## 标准化改动汇总
- 样式前缀统一：Menu/Modal/Tabs 类名统一为 `lcsy-` 前缀，例如 `lcsy-menu`、`lcsy-modal`、`lcsy-tabs`，避免全局类名冲突。
- 可访问性增强：
  - Select：`role="listbox"/"option"`、`aria-selected`、`aria-disabled`；禁用项不可点击。
  - MenuItem：`role="menuitem"`、`aria-expanded`、`aria-current`、`tabIndex`；支持键盘 Enter/Space。
  - Modal：`role="dialog"`、`aria-modal`；支持 ESC 关闭与遮罩关闭。
- 文档演示：`apps/docs/app/page.tsx` 增加 Select/Tabs/Menu/Modal 最小示例，并补充正确导入。
- 测试能力：在 `packages/core/package.json` 添加 `test` 脚本与依赖（`vitest`、`@testing-library/react`、`@testing-library/user-event`、`jsdom`）。
- 分发配置：在 `packages/core/package.json` 增加 `exports`、`files`、`sideEffects`；将 `react`/`react-dom` 移至 `peerDependencies`，避免宿主重复打包。
- Lint 修复：`packages/core/eslint.config.mjs` 改为最小本地配置，移除不存在的外部配置引用。
- Bug 修复：Tabs 容器 TSX 语法错误（多余 `}`）与调试日志；Card 模板字符串尾部多余引号。

## 开发与验证
- 安装依赖：`pnpm install`
- 构建：`pnpm build`
- 文档演示：`pnpm --filter docs dev`，浏览 `http://localhost:3001`
- 沙箱演示：`pnpm --filter playground dev`
- 代码检查：`pnpm lint`
- 单元测试：`pnpm --filter lcsy-design test`

## 使用示例
```tsx
import { Select, Tabs, Menu, Modal } from 'lcsy-design';

// Select
<Select
  options={[
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3', disabled: true },
  ]}
  defaultValue="1"
  onChange={(v)=>console.log(v)}
/>

// Tabs
<Tabs
  defaultActiveKey={'tab1'}
  items={[
    { key: 'tab1', label: '标签一', children: <div>内容一</div> },
    { key: 'tab2', label: '标签二', children: <div>内容二</div> },
    { key: 'tab3', label: '禁用', children: <div>内容三</div>, disabled: true },
  ]}
  onChange={(k)=>console.log(k)}
/>

// Modal
<Modal open={true} title={'示例弹窗'} onCancel={()=>{}} onOk={()=>{}}>
  这是弹窗内容
</Modal>
```
