package com.orange.domain.system.user.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "用户列表查询请求参数")
@Data
public class QueryUserReq {

    @Schema(description = "过滤字段", example = "username")
    private String filterField;

    @Schema(description = "过滤值", example = "admin")
    private String filterValue;

    @Schema(description = "分组ID", example = "1001")
    private String groupId;

    @Schema(description = "排序字段", example = "username")
    private String orderField;

    @Schema(description = "排序值", example = "asc")
    private String orderValue;

    @Schema(description = "页码", example = "1")
    private Integer page;

    @Schema(description = "每页数量", example = "10")
    private Integer size;
}
