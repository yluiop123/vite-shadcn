package com.mm.domain.system.group.req;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class QueryGroupReq {
    @Pattern(
            regexp = "^[A-Za-z0-9]+$",
            message = "只能包含数字和大小写字母"
    )
    private String id;
    private String name;

    @Pattern(
            regexp = "0|1|all",
            message = "只能是 0 或 1 或 all"
    )
    private String status;
}
