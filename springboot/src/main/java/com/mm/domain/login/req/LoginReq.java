package com.mm.domain.login.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Schema(description = "登录请求参数")
@Data
public class LoginReq {
    @Schema(description = "用户名",example = "admin")
    @NotBlank(message = "用户名不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]{4,}$",
            message = "只能包含数字和大小写字母，且长度不能小于4"
    )
    private String username;

    @Schema(description = "密码",example = "123456")
    @NotBlank(message = "密码不能为空")
    private String password;
}
