package com.orange.domain.system.role.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "删除角色请求参数")
@Data
public class DeleteRoleReq {
    @Schema(description = "角色ID列表")
    private List<String> ids;
}
