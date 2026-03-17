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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system/roles")
@CrossOrigin
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping
    public Response<PageData<Role>> queryRoles(@RequestBody QueryRoleReq req) {
        PageData<Role> pageData = roleService.queryRoles(req);
        return Response.ok(pageData);
    }

    @DeleteMapping
    public Response<String> deleteRoles(@RequestBody DeleteRoleReq req) {
        roleService.deleteRoles(req.getIds());
        return Response.ok("操作成功");
    }

    @PostMapping("/add")
    public Response<String> addRole(@RequestBody AddRoleReq req) {
        roleService.addRole(req);
        return Response.ok("操作成功");
    }
    @PostMapping("/edit")
    public Response<String> editRole(@RequestBody EditRoleReq user) {
        roleService.editRole(user);
        return Response.ok("操作成功");
    }

    @GetMapping("/detail/{roleId}")
    public Response<RoleBean> queryRole(@PathVariable("roleId") String roleId) {
        RoleBean user = roleService.queryRole(roleId);
        return Response.ok(user);
    }
}
