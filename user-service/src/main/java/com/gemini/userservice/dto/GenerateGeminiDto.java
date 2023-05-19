package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GenerateGeminiDto {

    private String prompt;

    private String negativePrompt;

    private String sampler_name;

    private Integer width;

    private Integer height;

    private String username;

    private List<Long> tag_ids;

    private Long seed;


    public GenerateGeminiDto(String prompt, String username, List<Long> tagIds){

        this.prompt = prompt;
        this.negativePrompt = "(nsfw:2),lowres,((bad anatomy)),((bad hands)),text,missing finger,extra digits,fewer digits,blurry,((mutated hands and fingers)),(poorly drawn face),((mutation)),((deformed face)),(ugly),((bad proportions)),((extra limbs)),extra face,(double head),(extra head),((extra feet)),monster,logo,cropped,worst quality,low quality,normal quality,jpeg,humpbacked,long body,long neck,((jpeg artifacts))";
        this.sampler_name = "DPM++ SDE Karras";
        this.width = 507;
        this.height = 676;
        this.username = username;
        this.tag_ids = tagIds;
    }


}
