package com.gemini.rankingservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseGenerateEmotionDto {

    private Long geminiNo;

    private List<String> imageUrls;

}
