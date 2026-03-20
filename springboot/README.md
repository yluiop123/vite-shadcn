
# Spring Boot Backend Project

English | [简体中文](./README.zh-CN.md)

## Project Overview

This project is an enterprise-level permission management system built with Spring Boot 4.0.2. It adopts JWT authentication and the RBAC (Role-Based Access Control) model, providing complete management features for users, roles, permissions, and groups.

## Tech Stack

- **Backend Framework**: Spring Boot 4.0.2
- **Java Version**: 25
- **Database**: PostgreSQL
- **Security Framework**: Spring Security + JWT
- **API Documentation**: SpringDoc OpenAPI 3.0
- **Cache**: Caffeine
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **Development Tools**: Lombok

## Core Modules

### 1. User Management

- CRUD operations for users
- User status management
- User group management

### 2. Role Management

- CRUD operations for roles
- Role-permission assignment
- Role status management

### 3. Permission Management

- Tree-structured permission management
- CRUD operations for permissions
- Parent-child permission relationships

### 4. Group Management

- Organizational tree structure management
- CRUD operations for groups
- Group movement and sorting

### 5. Authentication & Authorization

- JWT token authentication
- Login / Logout functionality
- Permission validation

## Database Design

### Core Tables

- `sys_user` – User table
- `sys_role` – Role table
- `sys_permission` – Permission table
- `sys_group` – Group table
- `user_role` – User-Role mapping table
- `role_permission` – Role-Permission mapping table
- `user_permission` – User-Permission mapping table

## Quick Start

### Requirements

- Java 25
- PostgreSQL
- Maven 3.6+

### Installation Steps

1. **Clone the project**
  
  ```bash
  git clone <repository-url>
  cd mm-boot
  ```
  
2. **Database Configuration**
  
  ```sql
  CREATE DATABASE mm;
  ```
  

Modify `application.yaml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mm
    username: your_username
    password: your_password
```

3. **Generate JWT Key Pair**
  
  ```bash
  openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
  openssl rsa -pubout -in private_key.pem -out public_key.pem
  ```
  

Place the keys under: `src/main/resources/keys/`

4. **Build the project**
  
  ```bash
  mvn clean install
  ```
  
5. **Run the project**
  
  ```bash
  mvn spring-boot:run
  ```
  

## Access URLs

- Application Home: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI Docs: http://localhost:8080/api-docs

## API Endpoints

### Authentication

- `POST /login` – User login
- `POST /logout` – User logout

### User APIs

- `GET /user/list` – Get user list
- `POST /user/add` – Create user
- `PUT /user/edit` – Update user
- `DELETE /user/delete` – Delete user

### Role APIs

- `GET /role/list` – Get role list
- `POST /role/add` – Create role
- `PUT /role/edit` – Update role
- `DELETE /role/delete` – Delete role

### Permission APIs

- `GET /permission/tree` – Get permission tree
- `POST /permission/add` – Create permission
- `PUT /permission/edit` – Update permission
- `DELETE /permission/delete` – Delete permission

### Group APIs

- `GET /group/tree` – Get group tree
- `POST /group/add` – Create group
- `PUT /group/edit` – Update group
- `DELETE /group/delete` – Delete group

## Configuration

### JWT Configuration

```yaml
jwt:
  private-key: classpath:keys/private_key.pem
  public-key: classpath:keys/public_key.pem
  access-expire: 900
  refresh-expire: 604800
```

### Cache Configuration

```yaml
spring:
  cache:
    type: caffeine
    cache-names:
      - group
    caffeine:
      spec: initialCapacity=100,maximumSize=10000,expireAfterWrite=30m,recordStats
```

## Development Guide

### Coding Standards

- Use Lombok to reduce boilerplate code
- Follow Spring Boot best practices
- Use JPA for data access
- Implement unified exception handling

### Extending the Project

1. Add Entity under `entity` package
2. Add Repository under `repository` package
3. Add Service under `service` package
4. Add Controller under `controller` package

## Deployment

### Production Configuration

1. Update database connection
2. Configure JWT expiration
3. Enable database DDL auto-update
4. Configure logging

### Performance Optimization Tips

- Enable connection pooling
- Configure caching strategies
- Use indexes
- Enable GZIP compression

## Troubleshooting

### Common Issues

1. Database connection failure
2. JWT authentication failure
3. Authorization failure

### Logs

Logs are printed to console.