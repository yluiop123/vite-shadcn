package com.mm.domain.system.group.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
@Schema(description = "添加兄弟组织请求参数")
@Data
public class AddBrotherGroupReq {
    @Schema(description = "兄弟组织ID")
    @NotBlank(message = "分组ID不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]{2,}$",
            message = "只能包含数字和大小写字母"
    )
    private String id;

    @Schema(description = "兄弟组织名称")
    @NotBlank(message = "分组名称不能为空")
    private String name;

    @Schema(description = "兄弟组织ID")
    @NotBlank(message = "兄弟分组ID不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]{2,}$",
            message = "只能包含数字和大小写字母"
    )
    private String brotherId;
}
