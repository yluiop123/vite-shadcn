package com.mm.controller.login;

import com.mm.domain.common.Response;
import com.mm.domain.login.req.LoginReq;
import com.mm.domain.login.resp.LoginResp;
import com.mm.domain.login.resp.UserInfo;
import com.mm.security.JwtUtil;
import com.mm.service.system.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class LoginController {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Response<LoginResp> login(@RequestBody LoginReq req) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        }catch (UsernameNotFoundException e) {
            return Response.ok(new LoginResp(null, "error", "username", "用户名不存在"));
        } catch (BadCredentialsException e) {
            return Response.ok(new LoginResp(null, "error", "password", "密码错误"));
        }catch(Exception e) {
            return Response.ok(new LoginResp(null, "error", "username", "登录失败"));
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(req.getUsername());
        final String jwtToken = jwtUtil.generateJwtToken(userDetails);
        return Response.ok(new LoginResp(jwtToken, "ok", null, null));
    }

    @GetMapping("/userInfo")
    public Response<UserInfo> userInfo(Principal principal) {
        String username = principal.getName();
        UserInfo userInfo = userService.queryUserInfo(username);
        return Response.ok(userInfo);
    }
}
