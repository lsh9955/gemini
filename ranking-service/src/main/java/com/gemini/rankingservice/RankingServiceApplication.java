package com.gemini.rankingservice;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class RankingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RankingServiceApplication.class, args);
	}

}
