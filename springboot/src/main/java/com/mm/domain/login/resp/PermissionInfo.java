package com.mm.domain.login.resp;

import lombok.Data;

@Data
public class PermissionInfo {
    private String path;
    private String role;
    private String type;
    private String action;
}
