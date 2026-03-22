package com.orange.controller.system;

import com.orange.domain.common.Response;
import com.orange.domain.system.permission.req.*;
import com.orange.entity.Permission;
import com.orange.service.system.PermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "权限管理", description = "权限管理相关接口")
@RestController
@RequestMapping("/api/system/permissions")
@CrossOrigin
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @Operation(summary = "查询权限列表", description = "根据查询条件分页返回权限列表")
    @PostMapping
    @PreAuthorize("hasAuthority('menu#/system/permission')")
    public Response<List<Permission>> queryPermissions(@RequestBody QueryPermissionReq req) {
        List<Permission> pageData = permissionService.queryPermissions(req);
        return Response.ok(pageData);
    }

    @Operation(summary = "删除权限", description = "根据权限ID删除权限")
    @DeleteMapping
    @PreAuthorize("hasAuthority('menu#/system/permission:delete')")
    public Response<String> deletePermissions(@RequestBody DeletePermissionReq req) {
        permissionService.deletePermissions(req.getIds());
        return Response.ok("操作成功");
    }

    @Operation(summary = "移动权限", description = "根据移动ID移动权限")
    @PostMapping("/move")
    @PreAuthorize("hasAuthority('menu#/system/permission:edit')")
    public Response<String> movePermission(@RequestBody MovePermissionReq req) {
        permissionService.movePermission(req);
        return Response.ok("操作成功");
    }

    @Operation(summary = "编辑权限", description = "根据编辑ID编辑权限")
    @PostMapping("/edit")
    @PreAuthorize("hasAuthority('menu#/system/permission:edit')")
    public Response<String> editPermission(@RequestBody EditPermissionReq req) {
        permissionService.editPermission(req);
        return Response.ok("操作成功");
    }

    @Operation(summary = "查询权限详情", description = "根据权限ID查询权限详情")
    @GetMapping("/detail/{groupId}")
    @PreAuthorize("hasAuthority('menu#/system/permission')")
    public Response<Permission> queryGroup(
            @Schema(description = "权限ID",example = "1")
            @PathVariable("groupId") String groupId) {
        Permission group = permissionService.queryPermission(groupId);
        return Response.ok(group);
    }

    @Operation(summary = "添加子权限", description = "根据添加子权限ID添加子权限")
    @PostMapping("/addChild")
    @PreAuthorize("hasAuthority('menu#/system/permission:add')")
    public Response<Permission> addChild(@RequestBody AddChildPermissionReq req) {
        Permission group = permissionService.addChild(req);
        return Response.ok(group);
    }

    @Operation(summary = "添加兄弟权限", description = "根据添加兄弟权限ID添加兄弟权限")
    @PostMapping("/addBrother")
    @PreAuthorize("hasAuthority('menu#/system/permission:add')")
    public Response<Permission> addBrother(@RequestBody AddBrotherPermissionReq req) {
        Permission group = permissionService.addBrother(req);
        return Response.ok(group);
    }

    @Operation(summary = "查询所有权限", description = "查询所有权限")
    @GetMapping
    @PreAuthorize("hasAuthority('menu#/system/permission')")
    public Response<List<Permission>> queryPermissions() {
        List<Permission> permissions = permissionService.queryPermissions();
        return Response.ok(permissions);
    }

}
