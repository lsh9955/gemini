package com.gemini.userservice.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RequestContractGeminiDto {

    private Long geminiNo;
    private String name;
    private String description;
    private Boolean isPublic;
}
