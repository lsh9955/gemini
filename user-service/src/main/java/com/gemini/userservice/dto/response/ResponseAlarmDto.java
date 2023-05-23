package com.gemini.userservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ResponseAlarmDto {

    private Long alarmId;

    private String memo;
    // 알람 종류
    private Integer category;
    // 좋아요 및 생성 된 알람 gemini_no
    private Long geminiNo;
    // 나를 팔로우 한 사람 => 추후 이사람 마이페이지로 넘어갈 때 필요
    private String follower;
    // background url
    private String imageUrl;
}
