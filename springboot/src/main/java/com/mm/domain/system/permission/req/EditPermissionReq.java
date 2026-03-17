package com.mm.domain.system.permission.req;

import lombok.Data;

@Data
public class EditPermissionReq {
    private String id;
    private String name;
    private String path;
    private String action;
    private String type;
}
