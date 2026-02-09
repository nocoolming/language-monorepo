---
name: Project Architecture / 项目架构
description: Documentation of the project's microservice architecture, specifically Model and Service layers / 项目微服务架构文档，特别是 Model 和 Service 层
---

# Project Architecture / 项目架构

## Overview / 概述

This project follows a strict separation of concerns based on microservices and domain boundaries.
本项目遵循基于微服务和领域边界的严格关注点分离。

---

## Core Structure / 核心结构

The project is divided into two main business domains, which correspond to distinct microservices and databases.
项目分为两个主要业务领域，对应不同的微服务和数据库。

### 1. Site Domain (SaaS Engine) / 站点领域（SaaS 引擎）
- **Path**: `site` packages (e.g., `src/model/site`, `src/service/site`)
- **Microservice**: Site Service / 站点服务
- **Database**: Site Database / 站点数据库
- **Context**: SaaS Independent Site Business (Like Shopify/Wix) / SaaS 独立站业务（类似 Shopify/Wix）
- **Responsibility**: Core business logic for independent sites. / 独立站核心业务逻辑。
- **Key Modules / 关键模块**:
  - `blog`: Blog posts, articles / 博客文章
  - `category`: Classification, taxonomy / 分类
  - `site`: Site configuration, basic info / 站点配置

### 2. Admin Domain (Merchant Admin) / 管理领域（商户后台）
- **Path**: `admin` packages (e.g., `src/model/admin`, `src/service/admin`)
- **Microservice**: Admin Service / 管理服务
- **Database**: Admin Database / 管理数据库
- **Context**: Single Tenant RBAC for SaaS Subscribers (Merchants) / SaaS 订阅客户（商户）的单租户 RBAC
- **Responsibility**: Management system for customers who purchased the SaaS service. / 购买 SaaS 服务的客户的管理系统。
- **Key Modules / 关键模块**:
  - `auth`: Authentication & Authorization / 认证与授权
    - `user`: User management / 用户管理
    - `role`: Role definitions / 角色定义
    - `permission`: Permission policies / 权限策略
    - `menu`: Menu configurations / 菜单配置

---

## Package Organization / 包组织

### @nocoolming/model (packages/model)
**Data Definition Layer / 数据定义层**

- `src/model/site`: Entities for the Site microservice / 站点微服务实体
- `src/model/admin`: Entities for the Admin microservice / 管理微服务实体
- **ID Type Precision / ID 类型精度**: Always use `string` for ID fields (mapping to Java `Long`) in TypeScript interfaces to avoid precision loss (> $2^{53}-1$).
  始终对映射到 Java `Long` 的 ID 字段使用 `string` 类型，以避免精度损失（超过 $2^{53}-1$）。

### @nocoolming/service (packages/service)
**Business Logic Layer / 业务逻辑层**

- `src/site`: API calls and logic for Site service / 站点服务的 API 调用和逻辑
- `src/admin`: API calls and logic for Admin service / 管理服务的 API 调用和逻辑
- **Rule**: Consumes `model`. Handles API communication (Axios). / **规则**: 使用 `model`。处理 API 通信 (Axios)。

### @nocoolming/store (packages/store)
**State Management Layer / 状态管理层**

This layer distinguishes between UI state (Page) and Data state (Business).
此层区分 UI 状态（Page）和数据状态（Business）。

#### 1. Page Stores (`src/store/page`)
- **Source**: Derived from **UI Pages / Views**. / **来源**: 源自 UI 页面/视图。
- **Purpose**: Manage state specific to a page or component (e.g., filter forms, pagination, UI toggles). / **目的**: 管理页面或组件特定的状态（如筛选表单、分页、UI 开关）。
- **Example**: `useMenuHomeStore` (State for the Menu Home page).

#### 2. Business Stores (`src/store/business`)
- **Source**: Derived from **Database Tables / Entities**. / **来源**: 源自数据库表/实体。
- **Purpose**: Manage shared data entities, caching, and synchronization with the backend. / **目的**: 管理共享数据实体、缓存以及与后端的同步。
- **Example**: `useSiteStore`, `useCategoryStore` (Data for Site and Category entities).

---

## Development Rules / 开发规则

1. **Isolation**: Code in `site` should not depend on `admin` DB structures directly, and vice versa, unless communicating via defined APIs.
   **隔离**: `site` 中的代码不应直接依赖 `admin` 数据库结构，反之亦然，除非通过定义的 API 进行通信。

2. **Correspondence**: When adding a new feature, ensure changes are made in the correct domain (`site` or `admin`) across both `model` and `service` layers.
   **对应**: 添加新功能时，确保在 `model` 和 `service` 层的正确领域（`site` 或 `admin`）中进行更改。

3. **Store Separation**: Always choose the correct store type: use `Page Store` for ephemeral UI state and `Business Store` for persistent entity data.
   **Store 分离**: 始终选择正确的 Store 类型：使用 `Page Store` 存储临时 UI 状态，使用 `Business Store` 存储持久化实体数据。
