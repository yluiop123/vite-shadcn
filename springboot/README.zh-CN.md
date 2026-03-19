# springboot后端项目

## 项目简介

本项目是一个基于 Spring Boot 4.0.2 构建的企业级权限管理系统，采用 JWT 认证和 RBAC（基于角色的访问控制）模型，提供完整的用户、角色、权限和分组管理功能。

## 技术栈

- **后端框架**: Spring Boot 4.0.2
- **Java版本**: 25
- **数据库**: PostgreSQL
- **安全框架**: Spring Security + JWT
- **API文档**: SpringDoc OpenAPI 3.0
- **缓存**: Caffeine
- **ORM**: Spring Data JPA
- **构建工具**: Maven
- **开发工具**: Lombok


## 核心功能模块

### 1. 用户管理 (User)
- 用户增删改查
- 用户状态管理
- 用户分组管理

### 2. 角色管理 (Role)
- 角色增删改查
- 角色权限分配
- 角色状态管理

### 3. 权限管理 (Permission)
- 权限树形结构管理
- 权限增删改查
- 父子权限关系管理

### 4. 分组管理 (Group)
- 组织架构树形管理
- 分组增删改查
- 分组移动和排序

### 5. 认证授权 (Authentication)
- JWT令牌认证
- 登录/登出功能
- 权限验证

## 数据库设计

### 核心表结构
- `sys_user` - 用户表
- `sys_role` - 角色表
- `sys_permission` - 权限表
- `sys_group` - 分组表
- `user_role` - 用户角色关联表
- `role_permission` - 角色权限关联表
- `user_permission` - 用户权限关联表

## 快速开始

### 环境要求
- Java 25
- PostgreSQL 数据库
- Maven 3.6+

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd mm-boot
```

2. **数据库配置**
```sql
-- 创建数据库
CREATE DATABASE mm;

-- 配置数据库连接（修改 application.yaml）
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mm
    username: your_username
    password: your_password
```

3. **生成JWT密钥对**
```bash
# 生成RSA私钥
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# 生成公钥
openssl rsa -pubout -in private_key.pem -out public_key.pem

# 将密钥文件放置在 src/main/resources/keys/ 目录下
```

4. **构建项目**
```bash
mvn clean install
```

5. **运行项目**
```bash
mvn spring-boot:run
```

### 访问地址

- 应用主页: http://localhost:8080
- API文档: http://localhost:8080/swagger-ui.html
- API接口: http://localhost:8080/api-docs

## API接口说明

### 认证接口
- `POST /login` - 用户登录
- `POST /logout` - 用户登出

### 用户管理接口
- `GET /user/list` - 获取用户列表
- `POST /user/add` - 添加用户
- `PUT /user/edit` - 编辑用户
- `DELETE /user/delete` - 删除用户

### 角色管理接口
- `GET /role/list` - 获取角色列表
- `POST /role/add` - 添加角色
- `PUT /role/edit` - 编辑角色
- `DELETE /role/delete` - 删除角色

### 权限管理接口
- `GET /permission/tree` - 获取权限树
- `POST /permission/add` - 添加权限
- `PUT /permission/edit` - 编辑权限
- `DELETE /permission/delete` - 删除权限

### 分组管理接口
- `GET /group/tree` - 获取分组树
- `POST /group/add` - 添加分组
- `PUT /group/edit` - 编辑分组
- `DELETE /group/delete` - 删除分组

## 配置说明

### JWT配置
```yaml
jwt:
  private-key: classpath:keys/private_key.pem
  public-key: classpath:keys/public_key.pem
  access-expire: 900        # 15分钟
  refresh-expire: 604800    # 7天
```

### 缓存配置
```yaml
spring:
  cache:
    type: caffeine
    cache-names:
      - group
    caffeine:
      spec: initialCapacity=100,maximumSize=10000,expireAfterWrite=30m,recordStats
```

## 开发指南

### 代码规范
- 使用Lombok减少样板代码
- 遵循Spring Boot最佳实践
- 使用JPA进行数据访问
- 统一的异常处理机制

### 扩展开发
1. 新增实体类：在 `entity` 包下创建
2. 新增Repository：在 `repository` 包下创建
3. 新增Service：在 `service` 包下创建
4. 新增Controller：在 `controller` 包下创建

## 部署说明

### 生产环境配置
1. 修改数据库连接为生产环境
2. 配置合适的JWT过期时间
3. 启用数据库DDL自动更新
4. 配置日志级别和输出

### 性能优化建议
- 启用数据库连接池
- 配置合适的缓存策略
- 使用数据库索引优化查询
- 启用GZIP压缩

## 故障排除

### 常见问题
1. **数据库连接失败**：检查数据库服务是否启动，连接配置是否正确
2. **JWT认证失败**：检查密钥文件是否存在且格式正确
3. **权限验证失败**：检查用户角色和权限配置

### 日志查看
应用日志输出到控制台，可通过日志级别配置查看详细信息。