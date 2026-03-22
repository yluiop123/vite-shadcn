package com.orange.domain.system.user.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.List;

@Schema(description = "编辑用户请求体")
@Data
public class EditUserReq {
    @Schema(description = "用户ID",example = "1")
    private String id;

    @Schema(description = "用户姓名",example = "张三")
    private String name;

    @Schema(description = "用户名",example = "zhangsan")
    private String username;

    @Schema(description = "用户邮箱",example = "zhangsan@example.com")
    @Email
    private String email;

    @Schema(description = "用户组ID",example = "1")
    private String groupId;

    @Schema(description = "用户手机号",example = "13800000000")
    private String phone;

    @Schema(description = "用户状态",example = "1")
    private String status;

    @Schema(description = "用户角色ID列表",example = "[\"admin\",\"user\"]")
    private List<String> roles;

    @Schema(description = "用户权限ID列表",example = "[\"0001\",\"0002\"]")
    private List<String> permissions;
}
