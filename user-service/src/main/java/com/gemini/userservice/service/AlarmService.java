package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.BackgroundAlarmDto;
import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.request.RequestContractGeminiDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.dto.response.ResponseGetAllAlarmsDto;
import com.gemini.userservice.entity.Alarm;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface AlarmService {

    SseEmitter subscribe(String username);

    ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto, SseEmitter emitter);

    ResponseAlarmDto createLikeAlarm(String username, LikeAlarmDto likeAlarmDto, SseEmitter emitter);

    ResponseAlarmDto createGeminiAlarm(GeminiAlarmDto geminiAlarmDto);

    ResponseAlarmDto createBackgroundAlarm(BackgroundAlarmDto backgroundAlarmDto, SseEmitter emitter);

    ResponseGetAllAlarmsDto getAllAlarms(String username);


    String deleteAlarm(String username, Long alarmId);

    String contractGemini(String username, RequestContractGeminiDto requestContractGeminiDto);

    void send(String usernmae, Long alarmId, ResponseAlarmDto responseAlarmDto);
}
