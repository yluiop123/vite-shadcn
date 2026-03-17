package com.mm.domain.system.role.req;

import lombok.Data;

import java.util.List;

@Data
public class AddRoleReq {

    private String name;

    private String id;

    private List<String> permissions;
}
