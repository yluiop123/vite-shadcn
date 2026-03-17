package com.mm.domain.system.role.req;

import lombok.Data;

import java.util.List;

@Data
public class DeleteRoleReq {
    private List<String> ids;
}
