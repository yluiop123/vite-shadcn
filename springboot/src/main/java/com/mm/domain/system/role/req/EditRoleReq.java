package com.mm.domain.system.role.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "编辑角色请求参数")
@Data
public class EditRoleReq {
    @Schema(description = "角色ID",example = "1")
    private String id;

    @Schema(description = "角色名称",example = "管理员")
    private String name;

    @Schema(description = "角色状态",example = "1")
    private String status;

    @Schema(description = "权限ID列表",example = "[ \"1\",\"2\",\"3\" ]")
    private List<String> permissions;
}
