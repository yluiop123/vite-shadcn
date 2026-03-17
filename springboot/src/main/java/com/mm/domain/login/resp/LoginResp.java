package com.mm.domain.login.resp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResp {
    private String token;
    private String status;
    private String field;
    private String msg;
}
