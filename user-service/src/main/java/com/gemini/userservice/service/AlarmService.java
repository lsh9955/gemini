package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface AlarmService {
    ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto);

}
