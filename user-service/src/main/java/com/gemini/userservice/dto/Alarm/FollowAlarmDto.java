package com.gemini.userservice.dto.Alarm;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FollowAlarmDto {
    // 알람을 얻는 사람 닉네임
    private String getAlarmNickName;
    // 알람 보내는 사람
    private String sendAlarmUserName;

}
