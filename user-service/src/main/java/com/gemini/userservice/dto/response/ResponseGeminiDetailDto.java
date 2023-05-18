package com.gemini.userservice.dto.response;

import com.gemini.userservice.entity.Tag;
import lombok.*;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseGeminiDetailDto {

    private String geminiName;

    private String geminiImage;

    private String geminiDescription;

    private Integer totalLike;

    private Boolean isPublic;

    private List<String> tags; //몽고

}