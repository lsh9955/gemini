package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface AlarmService {
    ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto, SseEmitter emitter);


    ResponseAlarmDto createLikeAlarm(String username, LikeAlarmDto likeAlarmDto, SseEmitter emitter);
}
