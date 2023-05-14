package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GeneratePoseDto {

    private List<Long> geminis;

    private List<String> gemini_prompt;

    private List<Long> gemini_seed;

    private Long pose_id;
}
