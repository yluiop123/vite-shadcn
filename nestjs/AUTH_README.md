# NestJS 登录鉴权和权限守卫

## 功能概述

本项目实现了基于JWT的登录认证和权限控制系统。

## API 端点

### 认证相关

#### 登录
```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

#### 注册
```
POST /auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password",
  "name": "新用户",
  "email": "user@example.com"
}
```

### 用户管理 (需要认证)

所有用户管理API都需要在请求头中包含JWT token：
```
Authorization: Bearer <your-jwt-token>
```

#### 查询用户
```
POST /api/system/users
```

#### 添加用户
```
POST /api/system/users/add
Content-Type: application/json

{
  "name": "张三",
  "username": "zhangsan",
  "password": "123456",
  "email": "zhangsan@example.com"
}
```

#### 编辑用户
```
POST /api/system/users/edit
```

#### 删除用户
```
DELETE /api/system/users
```

#### 获取用户详情
```
GET /api/system/users/detail/:userId
```

## 权限控制

### 权限装饰器

使用 `@RequirePermissions` 装饰器为路由设置权限要求：

```typescript
@Post()
@RequirePermissions('user:add')
async addUser(@Body() dto: AddUserDto) {
  // 只有拥有 'user:add' 权限的用户才能访问
}
```

### 守卫顺序

控制器使用以下守卫：
1. `JwtAuthGuard` - 验证JWT token
2. `PermissionGuard` - 检查用户权限

## 环境变量

设置以下环境变量：

```bash
JWT_SECRET=your-secret-key
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=orange
```

## 启动应用

```bash
pnpm install
pnpm run build
pnpm run start:prod
```

## 测试认证流程

1. 注册新用户或使用现有用户登录
2. 使用返回的 `access_token` 在后续请求中设置 `Authorization` 头
3. 访问受保护的API端点

## 注意事项

- 当前权限检查是简化的，所有已认证用户都可以访问所有API
- 后续可以扩展为从数据库查询用户的实际权限
- JWT token 默认24小时过期