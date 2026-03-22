package com.orange.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.*;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Autowired
    private PrivateKey privateKey;

    @Autowired
    private PublicKey publicKey;

    @Value("${jwt.access-expire}")
    private long accessExpire;

    @Value("${jwt.refresh-expire}")
    private long refreshExpire;

    public String generateJwtToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts
                .builder()
                .claims(claims)  // set the claims
                .subject(userDetails.getUsername())  // set the username as subject in payload
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + accessExpire * 1000))
                .signWith(privateKey, Jwts.SIG.RS256)  // signature part
                .compact();
    }

    // 生成 RefreshToken
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshExpire * 1000))
                .signWith(privateKey, Jwts.SIG.RS256)
                .compact();
    }
    public Boolean validateJwtToken(String token, UserDetails userDetails) {
        final Claims claims =  parse(token);
        String username = claims.getSubject();
        boolean isTokenExpired = claims.getExpiration().before(new Date());
        return (username.equals(userDetails.getUsername())) && !isTokenExpired;
    }
    public String getUsernameFromToken(String token) {
        final Claims claims = parse(token);
        return claims.getSubject();
    }
    // 解析
    public Claims parse(String token) {
        return Jwts.parser()
                .verifyWith(publicKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
