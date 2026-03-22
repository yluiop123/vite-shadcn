package com.mm.domain.system.user.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.List;

@Schema(description = "添加用户请求体")
@Data
public class AddUserReq {
    @Schema(description = "用户名", example = "张三")
    private String name;

    @Schema(description = "用户名", example = "admin")
    private String username;

    @Schema(description = "邮箱", example = "admin@example.com")
    @Email
    private String email;

    @Schema(description = "用户组ID", example = "1")
    private String groupId;

    @Schema(description = "手机号", example = "13800000000")
    private String phone;

    @Schema(description = "状态", example = "1")
    private String status;

    @Schema(description = "角色ID列表",  example = "[\"1001\",\"1002\"]")
    private List<String> roles;

    @Schema(description = "权限ID列表",  example = "[\"1001\",\"1002\"]")
    private List<String> permissions;
}
