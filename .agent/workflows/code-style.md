---
description: 项目代码风格规范
---

# 代码风格规范

## 1. 文件拆分原则

React 的核心思想是 **把复杂的东西用多个简单的东西组合而成**。

组件目录结构应当拆分为：
- `index.ts` - 导出入口
- `{component}.tsx` - 主组件逻辑
- `{component}-types.ts` - TypeScript 类型定义
- `{component}-variants.ts` - 样式变体定义 (使用 cva)
- `{component}-{subcomponent}.tsx` - 子组件

## 2. Code Review 流程

**在修改项目代码之前，必须：**
1. 先展示完整的代码方案
2. 等待用户确认
3. 确认后再执行修改

## 3. 组件设计原则

- 参考 Material UI 的 API 设计
- 使用 `class-variance-authority (cva)` 管理样式变体
- 支持 `asChild` prop (使用 @radix-ui/react-slot)
- 类型定义单独文件，便于导出和复用
