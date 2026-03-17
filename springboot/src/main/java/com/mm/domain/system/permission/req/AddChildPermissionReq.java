package com.mm.domain.system.permission.req;

import lombok.Data;

@Data
public class AddChildPermissionReq {
    private String id;
    private String name;
    private String path;
    private String action;
    private String type;
    private String parentId;
}
