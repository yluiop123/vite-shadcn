package com.mm.service.system.impl;

import com.mm.domain.common.BusinessException;
import com.mm.domain.common.PageData;
import com.mm.domain.system.role.req.AddRoleReq;
import com.mm.domain.system.role.req.EditRoleReq;
import com.mm.domain.system.role.req.QueryRoleReq;
import com.mm.domain.system.role.resp.RoleBean;
import com.mm.entity.Permission;
import com.mm.entity.Role;
import com.mm.entity.User;
import com.mm.repository.system.PermissionRepository;
import com.mm.repository.system.RoleRepository;
import com.mm.service.system.RoleService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.mm.config.Constanst.STATUS_ALL;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public PageData<Role> queryRoles(QueryRoleReq req) {
        String sortBy = req.getOrderField() == null ? "id" : req.getOrderField();
        String sortDir = req.getOrderValue() == null ? "asc" : req.getOrderValue();
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())?
                Sort.by(sortBy).ascending(): Sort.by(sortBy).descending();

        Specification<Role> spec = (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();
            String id = req.getId();
            String name = req.getName();
            String status = req.getStatus();
            if (id!=null&&!id.isEmpty()) {
                predicates.add( cb.like(root.get("id"), id + "%"));
            }
            if (name!=null&&!name.isEmpty()) {
                predicates.add(cb.like(root.get("name"), name + "%"));
            }
            if (status!=null&&!status.isEmpty()&&!STATUS_ALL.equals(status)) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        Pageable pageable = PageRequest.of(req.getPage()-1, req.getSize(), sort);
        Page<Role> pageUser = roleRepository.findAll(spec, pageable);
        return new PageData<>(pageUser.getTotalElements(), pageUser.getContent());
    }

    @Override
    @Transactional
    public Role addRole(AddRoleReq req) {
        Role role = new Role();
        role.setId(req.getId());
        role.setName(req.getName());
        List<Permission> permissions = permissionRepository.findAllById(req.getPermissions());
        role.getPermissions().clear(); // 先清掉原来的权限
        role.getPermissions().addAll(permissions);
        return roleRepository.save(role);
    }

    @Override
    @Transactional
    public Role editRole(EditRoleReq req) {
        Optional<Role> roleOptional = roleRepository.findById(req.getId());
        if (roleOptional.isEmpty()) {
            return null;
        }

        Role role = roleOptional.get();
        role.setId(req.getId());

        if (req.getName() != null) {
            role.setName(req.getName());
        }

        if (req.getStatus() != null) {
            role.setStatus(req.getStatus());
        }

        if (req.getPermissions() != null) {
            role.getPermissions().clear();
            if(!req.getPermissions().isEmpty()){
                List<Permission> permissions =
                        permissionRepository.findAllById(req.getPermissions());
                role.getPermissions().addAll(permissions);
            }
        }
        return role;
    }

    @Override
    @Transactional
    public void deleteRoles(List<String> ids) {
        List<Role> list = roleRepository.findAllById(ids);
        if (list.isEmpty()) {
            throw new BusinessException("角色不存在");
        }
        for (Role role : list) {
            if(!CollectionUtils.isEmpty(role.getPermissions())){
                throw new BusinessException("角色"+role.getId()+"已被权限引用，不能删除");
            }
            if(!CollectionUtils.isEmpty(role.getUsers())){
                throw new BusinessException("角色"+role.getId()+"已被用户引用，不能删除");
            }
        }
        roleRepository.deleteAllById(ids);
    }

    @Override
    public RoleBean queryRole(String id) {
        Role role = roleRepository.findWithAllAttributesById(id);
        RoleBean roleBean = new RoleBean();
        roleBean.setId(role.getId());
        roleBean.setName(role.getName());
        roleBean.setPermissions(role.getPermissions().stream().map(Permission::getId).collect(Collectors.toList()));
        return roleBean;
    }
}
