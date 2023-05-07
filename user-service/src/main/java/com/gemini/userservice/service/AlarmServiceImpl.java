package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.entity.Alarm;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.AlarmRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class AlarmServiceImpl implements AlarmService {

    @Autowired
    private AlarmRepository alarmRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    // SSE 클라이언트를 저장하는 리스트
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    @Override
    public ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto) {
        String message = alarmDto.getSendAlarmUserName() + "님이 회원님을 팔로우했습니다.";
        System.out.println(alarmDto.getSendAlarmUserName());
        System.out.println(message);

        // 회원정보 찾아오기
        UserInfo userInfo = userInfoRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(userInfo);

        Alarm alarm = Alarm.builder()
                .memo(message)
                .userInfo(userInfo)
                .category(1)
                .checked(false)
                .build();
        alarmRepository.save(alarm);
        System.out.println(alarmRepository);

        // 새로운 알림 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(message)
                .build();
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(responseAlarmDto);
            } catch (IOException ex) {
                // SSE 클라이언트 연결이 종료된 경우, 리스트에서 제거
                emitters.remove(emitter);
            }
        }
        System.out.println(responseAlarmDto);

        return responseAlarmDto;
    }
}
