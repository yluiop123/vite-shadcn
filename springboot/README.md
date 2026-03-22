# Spring Boot Backend Project

[English](./README.md) \| Simplified Chinese

## Project Overview

This project is an enterprise-level permission management system built
with Spring Boot 4.0.2. It uses JWT authentication and the RBAC
(Role-Based Access Control) model, providing complete management
features for users, roles, permissions, and groups.

Swagger API documentation: https://yluiop123.github.io/orange/#/swagger

## Tech Stack

- **Backend Framework**: Spring Boot 4
- **Java Version**: Java 17+
- **Database**: PostgreSQL
- **Security Framework**: Spring Security + JWT
- **API Documentation**: SpringDoc OpenAPI 3.0
- **Cache**: Caffeine
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **Development Tool**: Lombok

## Quick Start

### Clone the Project

```bash
git clone <repository-url>
cd springboot
```

### Database Configuration

Create the database and execute the ddl.sql and ddm.sql files in the
database directory.

Modify the database connection in application.yaml:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/orange
    username: your_username
    password: your_password
```

### Access URLs

- Home: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui.html
- OpenAPI: http://localhost:8080/api-docs

## Production Configuration

### Generate JWT Key Pair

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

Place the generated keys on the server and configure:

```yaml
jwt:
  private-key: classpath:keys/private_key.pem
  public-key: classpath:keys/public_key.pem
```

### Database Password

Use environment variable DB_PASSWORD:

```yaml
password: ${DB_PASSWORD:postgres}
```

## Project Structure

```
springboot/
├── src/main/java/com/orange/
│   ├── config/
│   ├── controller/
│   ├── domain/
│   ├── entity/
│   ├── repository/
│   ├── security/
│   ├── service/
│   └── OrangeBootApplication.java
├── src/main/resources/
│   ├── keys/
│   └── application.yaml
└── pom.xml
```

## Database Design

Core entities: User, Role, Permission, Group.

Relationships: - Many-to-One: User -\> Group - Many-to-Many: User \<-\>
Role - Many-to-Many: Role \<-\> Permission - Many-to-Many: User \<-\>
Permission

## Permission Control

- Uses RBAC model
- Permissions configured via Spring Security @PreAuthorize
- Rule format: type#path:action or permission code