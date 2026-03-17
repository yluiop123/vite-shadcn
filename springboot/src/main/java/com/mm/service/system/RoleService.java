package com.mm.service.system;

import com.mm.domain.common.PageData;
import com.mm.domain.system.role.req.AddRoleReq;
import com.mm.domain.system.role.req.EditRoleReq;
import com.mm.domain.system.role.req.QueryRoleReq;
import com.mm.domain.system.role.resp.RoleBean;
import com.mm.domain.system.user.req.AddUserReq;
import com.mm.domain.system.user.req.EditUserReq;
import com.mm.entity.Role;

import java.util.List;

public interface RoleService {
    PageData<Role> queryRoles(QueryRoleReq req);
    Role addRole(AddRoleReq role);
    Role editRole(EditRoleReq role);
    void deleteRoles(List<String> id);
    RoleBean queryRole(String id);
}
