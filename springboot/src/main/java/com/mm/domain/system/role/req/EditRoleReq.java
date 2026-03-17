package com.mm.domain.system.role.req;

import lombok.Data;

import java.util.List;

@Data
public class EditRoleReq {

    private String id;

    private String name;

    private String status;

    private List<String> permissions;
}
