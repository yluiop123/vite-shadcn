package com.mm.domain.system.user.resp;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
public class UserBean {

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

    private Set<RoleBean> roles = new HashSet<>();

    private Set<String> permissions = new HashSet<>();
}
