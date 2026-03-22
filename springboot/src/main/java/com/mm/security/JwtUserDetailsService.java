package com.mm.security;

import java.util.HashSet;
import java.util.Set;

import com.mm.domain.login.resp.PermissionInfo;
import com.mm.entity.Permission;
import com.mm.entity.Role;
import com.mm.repository.system.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.mm.config.Constanst.STATUS_DISABLE;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // create a user for "randomuser123"/"password".
        com.mm.entity.User user = userRepository.findByUsername(username);
        if (user==null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            Set<Role> roles = user.getRoles();
            String[] roleIds = roles.stream().map(Role::getId).toArray(String[]::new);
            Set<String> permissions = new HashSet<>();
            for (Role role : roles) {
                for (Permission permission : role.getPermissions()) {
                    permissions.addAll(getPermissionStrs(permission));
                }
            }
            for (Permission permission : user.getPermissions()) {
                permissions.addAll(getPermissionStrs(permission));
            }
            return User.builder().username(username)
                    .password(user.getPassword())
                    .disabled(STATUS_DISABLE.equals(user.getStatus()))
                    .roles(roleIds)
                    .authorities(permissions.toArray(String[]::new))
                    .build();
        }
    }

    private Set<String> getPermissionStrs(Permission permission) {
        Set<String> permissions = new HashSet<>();
        String id = permission.getId();
        permissions.add(id);

        String type = permission.getType();
        String path = permission.getPath();
        String action = permission.getAction();
        String permissionStr = type+"#"+path;
        if (StringUtils.isNotBlank(action)) {
            permissionStr+=":"+action;
        }
        permissions.add(permissionStr);
        return permissions;
    }
}
