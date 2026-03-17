package com.mm.domain.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.mm.domain.common.ErrorCode.SUCCESS;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    private Integer code;
    private String message;
    private T data;
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
