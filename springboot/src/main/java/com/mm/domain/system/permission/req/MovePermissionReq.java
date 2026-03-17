package com.mm.domain.system.permission.req;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class MovePermissionReq {
    private String id;

    @Pattern(
            regexp = "up|down|top",
            message = "只能是 up 或 down 或 top"
    )
    private String action;
}
