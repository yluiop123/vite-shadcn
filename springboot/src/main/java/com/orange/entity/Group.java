package com.orange.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Schema(description = "用户组实体")
@Entity
@Table(name="sys_group")
@Data
public class Group {
    @Schema(description = "组织编码")
    @Id
    @Column(name = "id")
    private String id;

    @Schema(description = "组织名称")
    @Column(name = "name")
    private String name;

    @Schema(description = "组织排序")
    @Column(name = "order_num")
    private Integer order;

    @Schema(description = "组织状态")
    @Column(name = "status")
    private String status = "1";

    @Schema(description = "创建时间")
    @Column(name = "create_time")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    @Column(name = "update_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @UpdateTimestamp
    private LocalDateTime updateTime;

    @Schema(description = "父组织编码")
    @Column(name = "parent_id")
    private String parentId;
}
