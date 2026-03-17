package com.mm.service.system;

import com.mm.domain.common.PageData;
import com.mm.domain.system.permission.req.*;
import com.mm.entity.Permission;

import java.util.List;

public interface PermissionService {
    List<Permission> queryPermissions(QueryPermissionReq req);
    void deletePermissions(List<String> id);
    void movePermission(MovePermissionReq req);
    Permission addChild(AddChildPermissionReq user);
    Permission addBrother(AddBrotherPermissionReq user);
    Permission editPermission(EditPermissionReq user);
    Permission queryPermission(String id);
    List<Permission> queryPermissions();
}
