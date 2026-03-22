package com.mm.domain.system.user.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "删除用户请求体")
@Data
public class DeleteUserReq {
    @Schema(description = "用户ID列表", example = "[\"1001\",\"1002\"]")
    private List<String> ids;
}
