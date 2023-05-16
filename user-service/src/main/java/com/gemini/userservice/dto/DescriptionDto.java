package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.batch.BatchDataSource;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class DescriptionDto {

    private String description;
}
