package com.mm.domain.system.user.req;

import lombok.Data;

import java.util.List;

@Data
public class DeleteUserReq {
    private List<String> ids;
}
