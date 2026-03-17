package com.mm.domain.system.group.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EditGroupReq {

    @NotBlank(message = "分组ID不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]{2,}$",
            message = "只能包含数字和大小写字母"
    )
    private String id;

    @NotBlank(message = "分组名称不能为空")
    private String name;

    @Pattern(
            regexp = "[01]",
            message = "状态只能是 0 或 1"
    )
    private String status;
}
