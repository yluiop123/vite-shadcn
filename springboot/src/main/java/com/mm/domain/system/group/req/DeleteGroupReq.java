package com.mm.domain.system.group.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class DeleteGroupReq {

    @NotEmpty(message = "分组ID列表不能为空")
    private List<String> ids;
}
