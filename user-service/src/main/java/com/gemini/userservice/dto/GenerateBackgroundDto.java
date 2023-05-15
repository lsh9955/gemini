package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class GenerateBackgroundDto {

    private String prompt;

    private String sampler_name;

    private String negativePrompt;

    private Integer width;

    private Integer height;

    public GenerateBackgroundDto(String prompt, Integer width, Integer height){

        this.prompt = prompt;
        this.negativePrompt = "human, man, men, woman, 1girl, 2girls, 3girls, 4girls, 5girls, multiple girls, 1boy, 2boys, 3boys, 4boys, 5boys, multiple boys,";
        this.sampler_name = "DPM++ SDE Karras";
        this.width = width;
        this.height = height;
    }
}
