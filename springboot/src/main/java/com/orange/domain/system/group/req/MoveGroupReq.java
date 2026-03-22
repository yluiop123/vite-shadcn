package com.orange.domain.system.group.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Schema(description = "移动组织请求参数")
@Data
public class MoveGroupReq {
    @Schema(description = "组织ID")
    @NotBlank(message = "组织ID不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]+$",
            message = "只能包含数字和大小写字母"
    )
    private String id;

    @Schema(description = "移动操作",allowableValues = {"up","down","top"})
    @Pattern(
            regexp = "up|down|top",
            message = "只能是 up 或 down 或 top"
    )
    private String action;
}
