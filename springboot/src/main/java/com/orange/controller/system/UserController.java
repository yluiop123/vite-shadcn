package com.orange.controller.system;

import com.orange.domain.common.PageData;
import com.orange.domain.common.Response;
import com.orange.domain.system.user.req.AddUserReq;
import com.orange.domain.system.user.req.DeleteUserReq;
import com.orange.domain.system.user.req.EditUserReq;
import com.orange.domain.system.user.req.QueryUserReq;
import com.orange.domain.system.user.resp.UserBean;
import com.orange.service.system.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "用户管理", description = "用户管理相关接口")
@RestController
@RequestMapping("/api/system/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "查询用户列表", description = "根据查询条件分页返回用户列表")
    @PostMapping
    @PreAuthorize("hasAuthority('menu#/system/user')") //type#path:action 配置方式
//@PreAuthorize("hasAuthority('000500')")  //权限编码配置方式
    public Response<PageData<UserBean>> queryUsers(@RequestBody QueryUserReq req) {
        PageData<UserBean> pageData = userService.queryUsers(req);
        return Response.ok(pageData);
    }

    @Operation(summary = "删除用户", description = "根据用户ID列表删除用户")
    @DeleteMapping
    @PreAuthorize("hasAuthority('menu#/system/user:delete')")
    public Response<String> deleteUsers(@RequestBody DeleteUserReq req) {
        userService.deleteUsers(req.getIds());
        return Response.ok("删除成功");
    }

    @Operation(summary = "添加用户", description = "根据用户信息添加新用户")
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('menu#/system/user:add')")
    public Response<String> addUser(@RequestBody AddUserReq user) {
        userService.addUser(user);
        return Response.ok("操作成功");
    }

    @Operation(summary = "编辑用户", description = "根据用户ID编辑用户信息")
    @PostMapping("/edit")
    @PreAuthorize("hasAuthority('menu#/system/user:edit')")
    public Response<String> editUser(@RequestBody EditUserReq user) {
        userService.editUser(user);
        return Response.ok("操作成功");
    }

    @Operation(summary = "重置用户密码", description = "根据用户ID重置用户密码")
    @PostMapping("/reset/{userId}")
    @PreAuthorize("hasAuthority('menu#/system/user:edit')")
    public Response<String> resetUser(@Parameter(description = "用户ID")
                                          @PathVariable("userId") String userId) {
        userService.resetUser(userId);
        return Response.ok("操作成功");
    }

    @Operation(summary = "查询用户详情", description = "根据用户ID查询用户详情")
    @GetMapping("/detail/{userId}")
    @PreAuthorize("hasAuthority('menu#/system/user')")
    public Response<UserBean> queryUser(@Parameter(description = "用户ID")
                                          @PathVariable("userId") String userId) {
        UserBean user = userService.queryUser(userId);
        return Response.ok(user);
    }
}
