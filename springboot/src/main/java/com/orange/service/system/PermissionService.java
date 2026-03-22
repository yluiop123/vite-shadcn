package com.orange.service.system;

import com.orange.domain.system.permission.req.*;
import com.orange.entity.Permission;

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
