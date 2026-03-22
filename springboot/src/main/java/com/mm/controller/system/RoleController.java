package com.mm.controller.system;

import com.mm.domain.common.PageData;
import com.mm.domain.common.Response;
import com.mm.domain.system.role.req.AddRoleReq;
import com.mm.domain.system.role.req.DeleteRoleReq;
import com.mm.domain.system.role.req.EditRoleReq;
import com.mm.domain.system.role.req.QueryRoleReq;
import com.mm.domain.system.role.resp.RoleBean;
import com.mm.entity.Role;
import com.mm.service.system.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "角色管理", description = "角色管理相关接口")
@RestController
@RequestMapping("/api/system/roles")
@CrossOrigin
public class RoleController {
    @Autowired
    private RoleService roleService;

    @Operation(summary = "查询角色列表", description = "根据查询条件分页返回角色列表")
    @PostMapping
    @PreAuthorize("hasAuthority('menu#/system/role')")
    public Response<PageData<Role>> queryRoles(@RequestBody QueryRoleReq req) {
        PageData<Role> pageData = roleService.queryRoles(req);
        return Response.ok(pageData);
    }

    @Operation(summary = "删除角色", description = "根据角色ID列表删除角色")
    @DeleteMapping
    @PreAuthorize("hasAuthority('menu#/system/role:delete')")
    public Response<String> deleteRoles(@RequestBody DeleteRoleReq req) {
        roleService.deleteRoles(req.getIds());
        return Response.ok("操作成功");
    }

    @Operation(summary = "添加角色", description = "根据添加角色请求参数添加新角色")
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('menu#/system/role:add')")
    public Response<String> addRole(@RequestBody AddRoleReq req) {
        roleService.addRole(req);
        return Response.ok("操作成功");
    }

    @Operation(summary = "编辑角色", description = "根据编辑角色请求参数更新角色信息")
    @PostMapping("/edit")
    @PreAuthorize("hasAuthority('menu#/system/role:edit')")
    public Response<String> editRole(@RequestBody EditRoleReq user) {
        roleService.editRole(user);
        return Response.ok("操作成功");
    }

    @Operation(summary = "查询角色详情", description = "根据角色ID查询角色详情")
    @GetMapping("/detail/{roleId}")
    @PreAuthorize("hasAuthority('menu#/system/role')")
    public Response<RoleBean> queryRole(@Parameter(description = "角色ID", example = "1")
            @PathVariable("roleId") String roleId) {
        RoleBean user = roleService.queryRole(roleId);
        return Response.ok(user);
    }
}
