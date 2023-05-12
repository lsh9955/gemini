package com.gemini.userservice.dto.Alarm;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LikeAlarmDto {
    // 알람 얻는 사람 닉네임
    private String getAlarmNickName;
    // 좋아요 받고 있는 제미니의 이름
    private String geminiName;
    // 총 좋아요 개수
    private Integer totalLike;
    //  좋아요 눌린 갤러리 no
    private Long galleryNo;

}
