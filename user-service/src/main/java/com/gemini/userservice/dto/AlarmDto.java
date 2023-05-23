package com.gemini.userservice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AlarmDto {

    private Long alarmId;

    private Integer category;

    private String follower;

    private Long geminiNo;

    private Long galleryNo;

    private String imageUrl;

    private String memo;
}
