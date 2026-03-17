package com.mm.controller.system;

import com.mm.domain.common.PageData;
import com.mm.domain.common.Response;
import com.mm.domain.system.group.req.*;
import com.mm.domain.system.permission.req.*;
import com.mm.entity.Group;
import com.mm.entity.Permission;
import com.mm.service.system.GroupService;
import com.mm.service.system.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/system/permissions")
@CrossOrigin
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @PostMapping
    public Response<List<Permission>> queryPermissions(@RequestBody QueryPermissionReq req) {
        List<Permission> pageData = permissionService.queryPermissions(req);
        return Response.ok(pageData);
    }

    @DeleteMapping
    public Response<String> deletePermissions(@RequestBody DeletePermissionReq req) {
        permissionService.deletePermissions(req.getIds());
        return Response.ok("操作成功");
    }
    @PostMapping("/move")
    public Response<String> movePermission(@RequestBody MovePermissionReq req) {
        permissionService.movePermission(req);
        return Response.ok("操作成功");
    }
    @PostMapping("/edit")
    public Response<String> editPermission(@RequestBody EditPermissionReq req) {
        permissionService.editPermission(req);
        return Response.ok("操作成功");
    }

    @GetMapping("/detail/{groupId}")
    public Response<Permission> queryGroup(@PathVariable("groupId") String groupId) {
        Permission group = permissionService.queryPermission(groupId);
        return Response.ok(group);
    }
    @PostMapping("/addChild")
    public Response<Permission> addChild(@RequestBody AddChildPermissionReq req) {
        Permission group = permissionService.addChild(req);
        return Response.ok(group);
    }

    @PostMapping("/addBrother")
    public Response<Permission> addBrother(@RequestBody AddBrotherPermissionReq req) {
        Permission group = permissionService.addBrother(req);
        return Response.ok(group);
    }
    @GetMapping
    public Response<List<Permission>> queryPermissions() {
        List<Permission> permissions = permissionService.queryPermissions();
        return Response.ok(permissions);
    }

}
