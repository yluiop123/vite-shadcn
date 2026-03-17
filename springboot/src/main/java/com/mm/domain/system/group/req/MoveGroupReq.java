package com.mm.domain.system.group.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.List;

@Data
public class MoveGroupReq {
    @NotBlank(message = "分组ID不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]+$",
            message = "只能包含数字和大小写字母"
    )
    private String id;

    @Pattern(
            regexp = "up|down|top",
            message = "只能是 up 或 down 或 top"
    )
    private String action;
}
