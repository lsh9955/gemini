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
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
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
    public ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto, SseEmitter emitter) {
        // 인코딩 한 메세지 넣기
        String message = alarmDto.getSendAlarmUserName() + "님이 회원님을 팔로우 했습니다.";
        String encodedMessage = new String(message.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        System.out.println(encodedMessage);


        // 회원정보 찾아오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(username);

        UserInfo userInfo = userInfo2.get();
        Alarm alarm = Alarm.builder()
                .memo(encodedMessage)
                .userInfo(userInfo)
                .category(1)
                .checked(false)
                .build();
        alarmRepository.save(alarm);

        // 새로운 알림 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();

        for (SseEmitter sseEmitter : emitters) {
            try {
                sseEmitter.send(responseAlarmDto);
            } catch (IOException ex) {
                // SSE 클라이언트 연결이 종료된 경우, 리스트에서 제거
                emitters.remove(emitter);
            }

        }

        return responseAlarmDto;
    }
    }

