# ORANGE
<img height="80" src="./readme/images/orange.png">

ORANGE 是一个前后端分离项目，前端在vite-shadcn目录下（react版本），后端在springboot目录下（java版本），数据库在database目录下（已实现postgres版本）。后期前端会扩展vue、angular等，后端会扩展（go、python、node、rust、c#、c++等），数据库会扩展mysql、mariadb等。

项目访问地址： https://yluiop123.github.io/orange

swagger 地址： https://yluiop123.github.io/orange/#/swagger

[English](./README.md) | 简体中文

<img height="500" src="./readme/images/dashboard-zh-CN.png">
<img height="500" src="./readme/images/disaster-command-zh-CN.png">
<img height="500" src="./readme/images/form-zh-CN.png">
<img height="500" src="./readme/images/rechart-zh-CN.png">

## 目录结构

### 1）vite-shadcn

- **框架**: React 19 + Vite6
- **状态管理**: Zustand
- **UI 组件库**: ShadCN + TailwindCSS
- **国际化**: react-intl
- **路由**: React Router v7
- **接口模拟**: Mock Service Worker (MSW)
- **构建工具**: Vite6

[vite-shadcn README](./vite-shadcn/README.zh-CN.md)

---

### 2）database
    此文件夹包含数据库相关DDL、DDM脚本。
    文件夹类型即为数据库类型，如postgres、mysql等。
    
---
### 3）springboot

- **后端框架**: Spring Boot 4.0.2
- **Java版本**: 25
- **数据库**: PostgreSQL
- **安全框架**: Spring Security + JWT
- **API文档**: SpringDoc OpenAPI 3.0
- **缓存**: Caffeine
- **ORM**: Spring Data JPA
- **构建工具**: Maven
- **开发工具**: Lombok

[springboot README](./springboot/README.zh-CN.md)

## 🧾 License

[MIT 协议](./LICENSE)
