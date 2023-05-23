package com.gemini.userservice.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RankingDto {

    private Long galleryNo;

    private String imageUrl;
}
