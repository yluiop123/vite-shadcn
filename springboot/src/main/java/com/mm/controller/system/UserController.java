package com.mm.controller.system;

import com.mm.domain.common.PageData;
import com.mm.domain.common.Response;
import com.mm.domain.system.user.req.AddUserReq;
import com.mm.domain.system.user.req.DeleteUserReq;
import com.mm.domain.system.user.req.EditUserReq;
import com.mm.domain.system.user.req.QueryUserReq;
import com.mm.domain.system.user.resp.UserBean;
import com.mm.service.system.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "用户管理", description = "包含用户的增、删、改、查相关接口")
@RestController
@RequestMapping("/api/system/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "查询用户列表", description = "根据查询条件分页返回用户列表")
    @PostMapping
    public Response<PageData<UserBean>> queryUsers(@RequestBody QueryUserReq req) {
        PageData<UserBean> pageData = userService.queryUsers(req);
        return Response.ok(pageData);
    }

    @DeleteMapping
    public Response<String> deleteUsers(@RequestBody DeleteUserReq req) {
        userService.deleteUsers(req.getIds());
        return Response.ok("删除成功");
    }

    @PostMapping("/add")
    public Response<String> addUser(@RequestBody AddUserReq user) {
        userService.addUser(user);
        return Response.ok("操作成功");
    }
    @PostMapping("/edit")
    public Response<String> editUser(@RequestBody EditUserReq user) {
        userService.editUser(user);
        return Response.ok("操作成功");
    }
    @PostMapping("/reset/{userId}")
    public Response<String> resetUser(@PathVariable("userId") String userId) {
        userService.resetUser(userId);
        return Response.ok("操作成功");
    }

    @GetMapping("/detail/{userId}")
    public Response<UserBean> queryUser(@PathVariable("userId") String userId) {
        UserBean user = userService.queryUser(userId);
        return Response.ok(user);
    }
}
