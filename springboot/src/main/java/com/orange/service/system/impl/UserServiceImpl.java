package com.orange.service.system.impl;

import com.orange.domain.common.BusinessException;
import com.orange.domain.common.PageData;
import com.orange.domain.login.resp.PermissionInfo;
import com.orange.domain.login.resp.RoleInfo;
import com.orange.domain.login.resp.UserInfo;
import com.orange.domain.system.user.req.AddUserReq;
import com.orange.domain.system.user.req.EditUserReq;
import com.orange.domain.system.user.req.QueryUserReq;
import com.orange.domain.system.user.resp.RoleBean;
import com.orange.domain.system.user.resp.UserBean;
import com.orange.entity.Group;
import com.orange.entity.Permission;
import com.orange.entity.Role;
import com.orange.entity.User;
import com.orange.repository.system.PermissionRepository;
import com.orange.repository.system.RoleRepository;
import com.orange.repository.system.UserRepository;
import com.orange.service.system.GroupService;
import com.orange.service.system.UserService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private GroupService groupService;
    @Override
    public PageData<UserBean> queryUsers(QueryUserReq req) {
        String sortBy = req.getOrderField() == null ? "id" : req.getOrderField();
        String sortDir = req.getOrderValue() == null ? "asc" : req.getOrderValue();
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())?
                Sort.by(sortBy).ascending(): Sort.by(sortBy).descending();

        Specification<User> spec = (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();
            String filterField = req.getFilterField();
            String filterValue = req.getFilterValue();

            if (filterField!=null && filterValue!=null) {
                predicates.add(
                        cb.like(root.get(filterField), filterValue + "%")
                );
            }
            if(req.getGroupId()!=null&&!req.getGroupId().isEmpty()){
                predicates.add(
                        cb.like(root.get("groupId"), req.getGroupId()+"%")
                );
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        Pageable pageable = PageRequest.of(req.getPage()-1, req.getSize(), sort);
        Page<User>  pageUser = userRepository.findAll(spec, pageable);
        List<User> pageUserList = pageUser.getContent();
        List<UserBean> userBeanList = pageUserList.stream().map(user -> {
            UserBean userBean = new UserBean();
            userBean.setId(user.getId());
            userBean.setName(user.getName());
            userBean.setUsername(user.getUsername());
            userBean.setEmail(user.getEmail());
            userBean.setGroupId(user.getGroupId());
            String groupName = groupService.queryGroup(user.getGroupId()).getName();
            userBean.setGroupName(groupName);
            userBean.setPhone(user.getPhone());
            userBean.setStatus(user.getStatus());
            userBean.setCreateTime(user.getCreateTime());
            userBean.setUpdateTime(user.getUpdateTime());
            return userBean;
        }).collect(Collectors.toList());
        return new PageData<>(pageUser.getTotalElements(), userBeanList);
    }

    @Override
    @Transactional
    public User addUser(AddUserReq req) {
        User user = new User();
        user.setName(req.getName());
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setGroupId(req.getGroupId());
        user.setPhone(req.getPhone());
        user.setPassword(passwordEncoder.encode(req.getUsername()));
        List<Role> roles = roleRepository.findAllById(req.getRoles());
        user.getRoles().addAll(roles);
        List<Permission> permissions = permissionRepository.findAllById(req.getPermissions());
        user.getPermissions().addAll(permissions);
        return userRepository.save(user);
    }
    @Override
    @Transactional
    public User editUser(EditUserReq req) {
        Optional<User> userOptional = userRepository.findById(req.getId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (req.getName() != null) {
                user.setName(req.getName());
            }

            if (req.getUsername() != null) {
                user.setUsername(req.getUsername());
            }

            if (req.getEmail() != null) {
                user.setEmail(req.getEmail());
            }

            if (req.getGroupId() != null) {
                user.setGroupId(req.getGroupId());
            }

            if (req.getPhone() != null) {
                user.setPhone(req.getPhone());
            }

            if (req.getStatus() != null) {
                user.setStatus(req.getStatus());
            }

            if (req.getRoles()!=null) {
                List<Role> roles = roleRepository.findAllById(req.getRoles());
                user.getRoles().clear();
                user.getRoles().addAll(roles);
            }

            if (req.getPermissions()!=null) {
                List<Permission> permissions = permissionRepository.findAllById(req.getPermissions());
                user.getPermissions().clear();
                user.getPermissions().addAll(permissions);
            }

            return user;
        }

        return null;
    }
    @Override
    public void deleteUsers(List<String> ids) {
        List<User> list = userRepository.findAllById(ids);
        if(CollectionUtils.isEmpty(list)){
            throw new BusinessException("用户不存在");
        }
        for (User user : list) {
            if(!CollectionUtils.isEmpty(user.getRoles())){
                throw new BusinessException("用户"+user.getUsername()+"已被角色引用，不能删除");
            }
            if(!CollectionUtils.isEmpty(user.getPermissions())){
                throw new BusinessException("用户"+user.getId()+"已被权限引用，不能删除");
            }
        }
        userRepository.deleteAllById(ids);
    }

    @Override
    public void resetUser(String id) {
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(user1 -> {
            user1.setPassword(passwordEncoder.encode(user1.getUsername()));
            userRepository.save(user1);
        });
    }

    @Override
    public UserBean queryUser(String id) {
        User user = userRepository.findWithAllAttributesById(id);
        if (user==null) {
            return null;
        }
        Group group = groupService.queryGroup(user.getGroupId());
        UserBean userBean = new UserBean();
        userBean.setId(user.getId());
        userBean.setName(user.getName());
        userBean.setUsername(user.getUsername());
        userBean.setEmail(user.getEmail());
        userBean.setGroupId(user.getGroupId());
        userBean.setGroupName(group.getName());
        userBean.setPhone(user.getPhone());
        userBean.setStatus(user.getStatus());
        userBean.setCreateTime(user.getCreateTime());
        userBean.setUpdateTime(user.getUpdateTime());
        Set<Role> roles = user.getRoles();
        for (Role role : roles) {
            RoleBean roleBean = new RoleBean();
            roleBean.setId(role.getId());
            roleBean.setName(role.getName());
            userBean.getRoles().add(roleBean);
        }
        for (Permission permission : user.getPermissions()) {
            userBean.getPermissions().add(permission.getId());
        }
        return userBean;
    }

    @Override
    @Transactional(readOnly = true)
    public UserInfo queryUserInfo(String username) {
        User user = userRepository.findWithAllAttributesByUsername(username);
        if (user==null) {
            return null;
        }
        Group group = groupService.queryGroup(user.getGroupId());
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());
        userInfo.setGroupId(user.getGroupId());
        userInfo.setGroupName(group.getName());
        userInfo.setPhone(user.getPhone());
        userInfo.setStatus(user.getStatus());
        userInfo.setCreateTime(user.getCreateTime());
        userInfo.setUpdateTime(user.getUpdateTime());
        Set<Role> roles = user.getRoles();
        for (Role role : roles) {
            RoleInfo roleInfo = new RoleInfo();
            roleInfo.setId(role.getId());
            roleInfo.setName(role.getName());
            userInfo.getRoles().add(roleInfo);
        }
        for (Role role : roles) {
            for (Permission permission : role.getPermissions()) {
                PermissionInfo permissionInfo = new PermissionInfo();
                permissionInfo.setRole(role.getId());
                permissionInfo.setType(permission.getType());
                permissionInfo.setPath(permission.getPath());
                permissionInfo.setAction(permission.getAction());
                userInfo.getRolePermissions().add(permissionInfo);
            }
        }
        for (Permission permission : user.getPermissions()) {
            PermissionInfo permissionInfo = new PermissionInfo();
            permissionInfo.setType(permission.getType());
            permissionInfo.setPath(permission.getPath());
            permissionInfo.setAction(permission.getAction());
            userInfo.getUserPermissions().add(permissionInfo);
        }
        return userInfo;
    }
}
