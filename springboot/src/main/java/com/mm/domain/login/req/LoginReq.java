package com.mm.domain.login.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LoginReq {
    @NotBlank(message = "用户名不能为空")
    @Pattern(
            regexp = "^[A-Za-z0-9]{4,}$",
            message = "只能包含数字和大小写字母，且长度不能小于4"
    )
    private String username;

    @NotBlank(message = "密码不能为空")
    private String password;
}
