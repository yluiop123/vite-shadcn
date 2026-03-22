package com.mm.domain.system.role.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "查询角色请求参数")
@Data
public class QueryRoleReq {

    @Schema(description = "角色ID",example = "1")
    private String id;

    @Schema(description = "角色名称",example = "管理员")
    private String name;

    @Schema(description = "角色状态",example = "1")
    private String status;

    @Schema(description = "排序字段",example = "name")
    private String orderField;

    @Schema(description = "排序值",example = "asc")
    private String orderValue;

    @Schema(description = "页码",example = "1")
    private Integer page;

    @Schema(description = "每页数量",example = "10")
    private Integer size;
}
