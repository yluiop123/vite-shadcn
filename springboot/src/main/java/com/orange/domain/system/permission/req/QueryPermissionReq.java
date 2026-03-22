package com.orange.domain.system.permission.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "查询权限请求参数")
@Data
public class QueryPermissionReq {
    @Schema(description = "权限ID")
    private String id;

    @Schema(description = "权限名称")
    private String name;

    @Schema(description = "权限状态",allowableValues = {"1","0","all"})
    private String status;
}
