package com.gemini.userservice.dto.Alarm;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class GeminiAlarmDto {
    // 만들어진 gemini_no
    private Long geminiNo;
    // 만든사람 nickname
    private String nickname;
    // 만든사람 username
    private String username;
}
