package com.mm.domain.system.permission.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "添加子权限请求参数")
@Data
public class AddChildPermissionReq {
    @Schema(description = "权限编码",example = "0102")
    private String id;

    @Schema(description = "权限名称",example = "用户管理")
    private String name;

    @Schema(description = "权限路径",example = "/user")
    private String path;

    @Schema(description = "权限操作",example = "list")
    private String action;

    @Schema(description = "权限类型",example = "menu")
    private String type;

    @Schema(description = "父权限编码",example = "01")
    private String parentId;
}
