package com.orange.controller.system;

import com.orange.domain.common.Response;
import com.orange.domain.system.group.req.*;
import com.orange.entity.Group;
import com.orange.service.system.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "组织管理", description = "组织管理相关接口")
@RestController
@RequestMapping("/api/system/groups")
@CrossOrigin
public class GroupController {
    @Autowired
    private GroupService groupService;

    @Operation(summary = "查询组织列表", description = "根据查询条件分页返回组织列表")
    @PostMapping
    @PreAuthorize("hasAuthority('menu#/system/group')")
    public Response<List<Group>> queryGroups(@RequestBody QueryGroupReq req) {
        List<Group> pageData = groupService.queryGroups(req);
        return Response.ok(pageData);
    }

    @Operation(summary = "删除组织", description = "根据组织ID删除组织")
    @DeleteMapping
    @PreAuthorize("hasAuthority('menu#/system/group:delete')")
    public Response<String> deleteGroups(@RequestBody DeleteGroupReq req) {
        groupService.deleteGroups(req.getIds());
        return Response.ok("操作成功");
    }

    @Operation(summary = "移动组织", description = "根据移动参数移动组织")
    @PostMapping("/move")
    @PreAuthorize("hasAuthority('menu#/system/group:edit')")
    public Response<String> moveGroup(@RequestBody MoveGroupReq req) {
        groupService.moveGroup(req);
        return Response.ok("操作成功");
    }

    @Operation(summary = "编辑组织", description = "根据编辑参数编辑组织")
    @PostMapping("/edit")
    @PreAuthorize("hasAuthority('menu#/system/group:edit')")
    public Response<String> editGroup(@RequestBody EditGroupReq req) {
        groupService.editGroup(req);
        return Response.ok("操作成功");
    }

    @Operation(summary = "查询组织详情", description = "根据组织ID查询组织详情")
    @GetMapping("/detail/{groupId}")
    @PreAuthorize("hasAuthority('menu#/system/group')")
    public Response<Group> queryGroup(
            @Parameter(description = "组织ID",example = "1")
            @PathVariable("groupId") String groupId) {
        Group group = groupService.queryGroup(groupId);
        return Response.ok(group);
    }

    @Operation(summary = "添加子组织", description = "添加子组织")
    @PostMapping("/addChild")
    @PreAuthorize("hasAuthority('menu#/system/group:add')")
    public Response<Group> addChild(@RequestBody @Valid AddChildGroupReq req) {
        Group group = groupService.addChild(req);
        return Response.ok(group);
    }

    @Operation(summary = "添加兄弟组织", description = "添加兄弟组织")
    @PostMapping("/addBrother")
    @PreAuthorize("hasAuthority('menu#/system/group:add')")
    public Response<Group> addBrother(@RequestBody @Valid AddBrotherGroupReq req) {
        Group group = groupService.addBrother(req);
        return Response.ok(group);
    }

    @Operation(summary = "查询所有组织", description = "查询所有组织")
    @GetMapping
    @PreAuthorize("hasAuthority('menu#/system/group')")
    public Response<List<Group>> queryGroups() {
        List<Group> groups = groupService.queryGroups();
        return Response.ok(groups);
    }

}
