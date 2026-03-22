package com.orange.repository.system;

import com.orange.entity.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> , JpaSpecificationExecutor<Role> {
    @EntityGraph(attributePaths = {"permissions"})
    Role findWithAllAttributesById(String id);
}
