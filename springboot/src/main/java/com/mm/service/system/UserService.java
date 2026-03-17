package com.mm.service.system;

import com.mm.domain.common.PageData;
import com.mm.domain.login.resp.UserInfo;
import com.mm.domain.system.user.req.AddUserReq;
import com.mm.domain.system.user.req.EditUserReq;
import com.mm.domain.system.user.req.QueryUserReq;
import com.mm.domain.system.user.resp.UserBean;
import com.mm.entity.User;

import java.util.List;

public interface UserService {
    PageData<UserBean> queryUsers(QueryUserReq req);
    User addUser(AddUserReq user);
    User editUser(EditUserReq user);
    void deleteUsers(List<String> id);
    void resetUser(String id);
    UserBean queryUser(String id);

    UserInfo queryUserInfo(String username);
}
