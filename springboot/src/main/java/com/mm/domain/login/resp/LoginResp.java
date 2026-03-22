package com.mm.domain.login.resp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Schema(description = "登录响应参数")
@Data
@AllArgsConstructor
public class LoginResp {
    @Schema(description = "登录凭证",example = "123456")
    private String token;
    @Schema(description = "状态码",example = "ok",allowableValues = {"ok","error"})
    private String status;
    @Schema(description = "错误字段",example = "username")
    private String field;
    @Schema(description = "错误信息",example = "用户名或密码错误")
    private String msg;
}
