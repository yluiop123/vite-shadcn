package com.orange.domain.system.permission.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "添加兄弟权限请求参数")
@Data
public class AddBrotherPermissionReq {
    @Schema(description = "权限编码",example = "0103")
    private String id;

    @Schema(description = "权限名称",example = "角色管理")
    private String name;

    @Schema(description = "权限路径",example = "/role")
    private String path;

    @Schema(description = "权限操作",example = "add")
    private String action;

    @Schema(description = "权限类型",example = "menu")
    private String type;

    @Schema(description = "兄弟权限编码",example = "0102")
    private String brotherId;
}
