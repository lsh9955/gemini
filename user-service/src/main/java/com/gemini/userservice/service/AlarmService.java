package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AlarmService {
    ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto, SseEmitter emitter);

    ResponseAlarmDto createLikeAlarm(String username, LikeAlarmDto likeAlarmDto, SseEmitter emitter);

    ResponseAlarmDto createGeminiAlarm(GeminiAlarmDto geminiAlarmDto, SseEmitter emitter);

    String deleteAlarm(String username, Long alarmId);

    String contractGemini(String username, Long geminiNo);

}
