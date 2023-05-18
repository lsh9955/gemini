package com.gemini.rankingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GenerateEmotionDto {

    private List<String> gemini_prompt;

    private Long seed;

    private Long gemini_number;

    private String period;

    public GenerateEmotionDto(List<String> prompts, Long seed, Long geminiNo, String period){

        this.gemini_prompt = prompts;
        this.seed = seed;
        this.gemini_number = geminiNo;
        this.period = period;
    }


}
