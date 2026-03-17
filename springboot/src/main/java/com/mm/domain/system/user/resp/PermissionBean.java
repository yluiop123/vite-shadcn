package com.mm.domain.system.user.resp;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PermissionBean {
    private String id;

    private String name;

    private String path;

    private String action;

    private String type;

    private String status;

    private Integer order;

    private LocalDateTime createTime;

    private String parentId;
}
