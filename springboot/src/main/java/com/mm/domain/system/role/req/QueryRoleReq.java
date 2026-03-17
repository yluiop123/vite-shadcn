package com.mm.domain.system.role.req;

import lombok.Data;

@Data
public class QueryRoleReq {
    private String id;
    private String name;
    private String status;
    private String orderField;
    private String orderValue;
    private Integer page;
    private Integer size;
}
