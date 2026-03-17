package com.mm.domain.system.permission.req;

import lombok.Data;

import java.util.List;

@Data
public class DeletePermissionReq {
    private List<String> ids;
}
