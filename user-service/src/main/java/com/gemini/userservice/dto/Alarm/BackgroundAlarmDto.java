package com.gemini.userservice.dto.Alarm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class BackgroundAlarmDto {

    // 만든 사람 닉네임, 만든 사람 유저네임, 만들어진 이미지 url
    private String username;

    private String imageUrl;

}
