package com.gemini.userservice.dto.Alarm;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FollowAlarmDto {
    private Long getAlarmPk;
    private String sendAlarmUserName;
}
