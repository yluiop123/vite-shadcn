package com.orange.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Schema(description = "权限实体")
@Entity
@Table(name="sys_permission")
@Data
@EqualsAndHashCode(exclude = {"users", "roles"})
public class Permission {
    @Schema(description = "权限编码")
    @Id
    @Column(name = "id")
    private String id;

    @Schema(description = "权限名称")
    @Column(name = "name")
    private String name;

    @Schema(description = "权限路径")
    @Column(name = "path")
    private String path;

    @Schema(description = "权限操作")
    @Column(name = "action")
    private String action;

    @Schema(description = "权限类型")
    @Column(name = "type")
    private String type;

    @Schema(description = "权限状态")
    @Column(name = "status")
    private String status ="1";

    @Schema(description = "权限排序")
    @Column(name = "order_num")
    private Integer order;

    @Schema(description = "创建时间")
    @Column(name = "create_time")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    @Column(name = "update_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @UpdateTimestamp
    private LocalDateTime updateTime;

    @Schema(description = "父权限ID")
    @Column(name = "parent_id")
    private String parentId;

//    @OneToMany(mappedBy = "permission", fetch = FetchType.LAZY)
//    @JsonIgnoreProperties("user")
//    @ToString.Exclude
//    private List<RolePermission> rolePermissions;
//
//    @OneToMany(mappedBy = "permission", fetch = FetchType.LAZY)
//    @JsonIgnoreProperties("user")
//    @ToString.Exclude
//
//    private List<UserPermission> userPermissions;

    @Schema(description = "用户列表")
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "sys_user_permission",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<User> users = new HashSet<>();

    @Schema(description = "角色列表")
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "sys_role_permission",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<Role> roles = new HashSet<>();
}
