package com.mm.domain.system.role.resp;

import lombok.Data;

import java.util.List;

@Data
public class RoleBean {
    private String name;

    private String id;

    private List<String> permissions;
}
