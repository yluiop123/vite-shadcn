package com.orange.domain.common;

public enum ErrorCode {

    SUCCESS(200, "success"),

    PARAM_ERROR(40001, "参数错误"),
    VALIDATE_ERROR(40002, "服务器校验异常"),
    UNAUTHORIZED(40101, "未登录"),
    AUTH_DENIED(40301, "无权限"),
    NOT_FOUND(40401, "数据不存在"),

    SYSTEM_ERROR(50000, "系统异常");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public int getCode() {
        return code;
    }
}