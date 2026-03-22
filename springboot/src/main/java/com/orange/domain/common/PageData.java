package com.orange.domain.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Schema(description = "分页数据响应参数")
@Data
@AllArgsConstructor
public class PageData<T> {
    @Schema(description = "总记录数",example = "100")
    private Long total;
    @Schema(description = "分页数据列表")
    private List<T> list;
}
