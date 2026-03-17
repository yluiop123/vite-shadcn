package com.mm.controller.system;

import com.mm.domain.common.PageData;
import com.mm.domain.common.Response;
import com.mm.domain.system.group.req.*;
import com.mm.domain.system.role.req.AddRoleReq;
import com.mm.domain.system.role.req.DeleteRoleReq;
import com.mm.domain.system.role.req.EditRoleReq;
import com.mm.domain.system.role.req.QueryRoleReq;
import com.mm.entity.Group;
import com.mm.entity.Role;
import com.mm.service.system.GroupService;
import com.mm.service.system.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/system/groups")
@CrossOrigin
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping
    public Response<List<Group>> queryGroups(@RequestBody QueryGroupReq req) {
        List<Group> pageData = groupService.queryGroups(req);
        return Response.ok(pageData);
    }

    @DeleteMapping
    public Response<String> deleteGroups(@RequestBody DeleteGroupReq req) {
        groupService.deleteGroups(req.getIds());
        return Response.ok("操作成功");
    }
    @PostMapping("/move")
    public Response<String> moveGroup(@RequestBody MoveGroupReq req) {
        groupService.moveGroup(req);
        return Response.ok("操作成功");
    }
    @PostMapping("/edit")
    public Response<String> editGroup(@RequestBody EditGroupReq req) {
        groupService.editGroup(req);
        return Response.ok("操作成功");
    }

    @GetMapping("/detail/{groupId}")
    public Response<Group> queryGroup(@PathVariable("groupId") String groupId) {
        Group group = groupService.queryGroup(groupId);
        return Response.ok(group);
    }
    @PostMapping("/addChild")
    public Response<Group> addChild(@RequestBody @Valid AddChildGroupReq req) {
        Group group = groupService.addChild(req);
        return Response.ok(group);
    }

    @PostMapping("/addBrother")
    public Response<Group> addBrother(@RequestBody @Valid AddBrotherGroupReq req) {
        Group group = groupService.addBrother(req);
        return Response.ok(group);
    }
    @GetMapping
    public Response<List<Group>> queryGroups() {
        List<Group> groups = groupService.queryGroups();
        return Response.ok(groups);
    }

}
