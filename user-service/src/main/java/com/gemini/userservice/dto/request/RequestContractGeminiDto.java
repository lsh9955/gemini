package com.gemini.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestContractGeminiDto {

    private Long geminiNo;

    private String name;

    private String description;

    private Boolean isPublic;
}
