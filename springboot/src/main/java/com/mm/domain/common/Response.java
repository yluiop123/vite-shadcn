package com.mm.domain.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.mm.domain.common.ErrorCode.SUCCESS;

@Schema(description = "通用响应体")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    @Schema(description = "状态码", example = "200")
    private Integer code;
    @Schema(description = "状态信息", example = "操作成功")
    private String message;
    @Schema(description = "数据")
    private T data;
    @Schema(description = "时间戳", example = "1694502400000")
    private long timestamp;

    public static <T> Response<T> ok(T data) {
        if (data instanceof String) {
            return new Response<>(SUCCESS.getCode(), (String) data, data, System.currentTimeMillis());
        }
        return new Response<>(SUCCESS.getCode(), "", data, System.currentTimeMillis());
    }

    public static <T> Response<T> ok(String message, T data) {

        return new Response<>(SUCCESS.getCode(), message, data, System.currentTimeMillis());
    }

    public static <T> Response<T> error(int code, String message) {
        Response<T> r = new Response<>();
        r.code = code;
        r.message = message;
        r.timestamp = System.currentTimeMillis();
        return r;
    }

    public static <T> Response<T> error(int code, String message, T data) {
        Response<T> r = new Response<>();
        r.code = code;
        r.message = message;
        r.data = data;
        r.timestamp = System.currentTimeMillis();
        return r;
    }
}
