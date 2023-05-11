package com.gemini.userservice.dto.response;

import com.gemini.userservice.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseGeminiDto {

    private String name;

    private String image;

    private String prompt;


    public ResponseGeminiDto(Tag tag){

        this.name = tag.getName();
        this.image = tag.getImageUrl();
        this.prompt = tag.getPrompt();
    }
}
