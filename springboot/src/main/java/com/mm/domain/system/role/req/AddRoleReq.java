package com.mm.domain.system.role.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "添加角色请求参数")
@Data
public class AddRoleReq {
    @Schema(description = "角色名称",example = "管理员")
    private String name;

    @Schema(description = "角色ID",example = "1")
    private String id;

    @Schema(description = "权限列表")
    private List<String> permissions;
}
