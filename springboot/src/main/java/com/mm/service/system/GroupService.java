package com.mm.service.system;

import com.mm.domain.common.PageData;
import com.mm.domain.system.group.req.*;
import com.mm.domain.system.user.req.AddUserReq;
import com.mm.domain.system.user.req.EditUserReq;
import com.mm.domain.system.user.req.QueryUserReq;
import com.mm.entity.Group;
import com.mm.entity.User;

import java.util.List;
import java.util.Map;

public interface GroupService {
    List<Group> queryGroups(QueryGroupReq req);
    void deleteGroups(List<String> id);
    void moveGroup(MoveGroupReq req);
    Group addChild(AddChildGroupReq user);
    Group addBrother(AddBrotherGroupReq user);
    Group editGroup(EditGroupReq user);
    Group queryGroup(String id);
    List<Group> queryGroups();
}
