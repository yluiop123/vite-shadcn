package com.mm.controller;

import com.mm.domain.common.BusinessException;
import com.mm.domain.common.ErrorCode;
import com.mm.domain.common.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.Map;
import java.util.stream.Collectors;

import static com.mm.domain.common.ErrorCode.PARAM_ERROR;
import static com.mm.domain.common.ErrorCode.SYSTEM_ERROR;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    // 捕获自定义业务异常
    @ExceptionHandler(BusinessException.class)
    public Response<?> handleBusinessException(BusinessException e){
        return Response.error(ErrorCode.VALIDATE_ERROR);
    }
    @ExceptionHandler(AuthorizationDeniedException.class)
    public Response<?> handleAuthorizationDeniedException(AuthorizationDeniedException e){
        return Response.error(ErrorCode.AUTH_DENIED);
    }
    // 捕获参数绑定异常（@Valid 校验失败）
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response<Map<String, String>> handleValidationException(MethodArgumentNotValidException e){
        Map<String, String> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,        // key = 字段名
                        fieldError -> fieldError.getDefaultMessage(), // value = 错误信息
                        (existing, replacement) -> existing        // 如果同一个字段有多个错误，保留第一个
                ));
        return Response.error(PARAM_ERROR.getCode(),PARAM_ERROR.getMessage(),errors);
    }

    // 捕获未处理异常（系统异常）
    @ExceptionHandler(Exception.class)
    public Response<?> handleException(Exception e){
        log.error(e.getMessage());
        return Response.error(SYSTEM_ERROR.getCode(), SYSTEM_ERROR.getMessage());
    }
}
