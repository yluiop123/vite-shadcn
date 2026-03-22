package com.mm.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Schema(description = "用户实体")
@Entity
@Table(name="sys_user",
    uniqueConstraints = @UniqueConstraint(
        name = "unique_username",
        columnNames = "username"
    )
)
@Data
@EqualsAndHashCode(exclude = {"roles", "permissions"})
public class User {
    @Schema(description = "用户id",example = "1")
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Schema(description = "用户姓名",example = "admin")
    @Column(name = "name")
    private String name;

    @Schema(description = "用户名",example = "admin")
    @Column(name = "username")
    private String username;

    @Schema(description = "用户邮箱",example = "admin@example.com")
    @Column(name = "email")
    private String email;

    @Schema(description = "用户组织编码",example = "1")
    @Column(name = "group_id")
    private String groupId;

    @Schema(description = "用户手机号",example = "13800000000")
    @Column(name = "phone")
    private String phone;

    @Schema(description = "用户状态",example = "1")
    @Column(name = "status")
    private String status="1";

    @Column(name = "password")
    @ToString.Exclude
    @JsonIgnore
    private String password;

    @Schema(description = "创建时间",example = "2023-01-01 00:00:00")
    @Column(name = "create_time")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @Schema(description = "更新时间",example = "2023-01-01 00:00:00")
    @Column(name = "update_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @UpdateTimestamp
    private LocalDateTime updateTime;

//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    @JsonIgnore
//    @ToString.Exclude
//    private List<UserRole> userRoles;
//
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    @JsonIgnore
//    @ToString.Exclude
//
//    private List<UserPermission> userPermissions;

    @Schema(description = "用户角色",example = "admin")
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "sys_user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<Role> roles = new HashSet<>();

    @Schema(description = "用户权限",example = "admin")
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "sys_user_permission",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<Permission> permissions = new HashSet<>();


}
