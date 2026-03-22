package com.mm.domain.system.permission.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "删除权限请求参数")
@Data
public class DeletePermissionReq {
    @Schema(description = "权限ID列表",example = "[ \"1\",\"2\",\"3\" ]")
    private List<String> ids;
}
