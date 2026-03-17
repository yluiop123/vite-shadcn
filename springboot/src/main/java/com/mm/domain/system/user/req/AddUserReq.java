package com.mm.domain.system.user.req;

import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.List;

@Data
public class AddUserReq {

    private String name;

    private String username;

    @Email
    private String email;

    private String groupId;

    private String phone;

    private String status;

    private List<String> roles;

    private List<String> permissions;
}
