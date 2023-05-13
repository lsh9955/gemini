package com.gemini.userservice.dto.request;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RequestGenerateGeminiDto {

    private List<Long> tagIds;

    private Long seed;
}
