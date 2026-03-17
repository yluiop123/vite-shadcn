package com.mm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MmBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(MmBootApplication.class, args);
	}

}
