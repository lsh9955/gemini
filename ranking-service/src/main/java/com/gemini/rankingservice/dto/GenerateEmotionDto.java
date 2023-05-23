package com.gemini.rankingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class GenerateEmotionDto {

    private String prompt;

    private String negative_prompt;

    private String sampler_name;

    private Integer width;

    private Integer height;

    private String username;

    private List<Long> tagIds;

    private Long seed;

    private Long geminiNo;


    public GenerateEmotionDto(String prompt, String username, List<Long> tagIds, Long geminiNo){

        this.prompt = prompt;
        this.negative_prompt = "lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts)), ((nsfw))";
        this.sampler_name = "DPM++ SDE Karras";
        this.width = 507;
        this.height = 676;
        this.username = username;
        this.tagIds = tagIds;
        this.geminiNo = geminiNo;
    }


}
