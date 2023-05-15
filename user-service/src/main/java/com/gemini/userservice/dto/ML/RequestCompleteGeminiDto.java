package com.gemini.userservice.dto.ML;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RequestCompleteGeminiDto {

    private String username;

    private String imageUrl;

    private List<Long> tagIds;

    private String prompt;

    private Long seed;
}
