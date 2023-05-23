package com.gemini.userservice.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class GeneratePoseDto {

    private List<Long> geminis;

    private List<String> gemini_prompt;

    private List<Long> gemini_seed;

    private Integer pose_id;

    private String background_url;
}
