package com.mm.domain.login.resp;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class UserInfo {

    private String id;

    private String name;

    private String username;

    private String email;

    private String groupId;

    private String groupName;

    private String phone;

    private String status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    private Set<RoleInfo> roles = new HashSet<>();

    private Set<PermissionInfo> rolePermissions = new HashSet<>();

    private Set<PermissionInfo> userPermissions = new HashSet<>();

}
