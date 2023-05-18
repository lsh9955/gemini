package com.gemini.userservice.api;

import com.gemini.userservice.dto.Alarm.BackgroundAlarmDto;
import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.BackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.repository.AlarmRepository;
import com.gemini.userservice.repository.EmitterRepository;
import com.gemini.userservice.service.AlarmService;
import com.gemini.userservice.service.CompleteService;
import com.gemini.userservice.service.EmitterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user-service/complete")
public class CompleteApiController {

    @Autowired
    private EmitterService emitterService;


    private final EmitterRepository emitterRepository;


    private final CompleteService completeService;

    private final AlarmService alarmService;

    private final AlarmRepository alarmRepository;

    @PostMapping("/gemini")
    public ResponseEntity<?> completeGemini(@RequestBody RequestCompleteGeminiDto requestCompleteGeminiDto) {

        Long res = completeService.completeGemini(requestCompleteGeminiDto);

        // res가 null 값이 아니면 알람 생성
        if(res != null) {

            //알림 메세지를 만들기 위해 GeminiAlarmDto에 넣어준다. => service에서 닉네임을 찾아줄 예정
            GeminiAlarmDto geminiAlarmDto = new GeminiAlarmDto();
            geminiAlarmDto.setGeminiNo(res);
            geminiAlarmDto.setUsername(requestCompleteGeminiDto.getUsername());
            geminiAlarmDto.setImageUrl(requestCompleteGeminiDto.getImageUrl());
            alarmService.createGeminiAlarm(geminiAlarmDto);
        }

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/background")
    public ResponseEntity<?> completeBackground(@RequestBody RequestCompleteBackgroundDto requestCompleteBackgroundDto) {

        log.info("배경 생성 완료 응답");
        log.info("username: " + requestCompleteBackgroundDto.getUsername());
        log.info("image: " + requestCompleteBackgroundDto.getImageUrl());
        String res = completeService.completeBackground(requestCompleteBackgroundDto);

        // res가 null 값이 아니면 알람 생성
        if (res != null) {
            // 알람 메세지를 만들기 위해 BackgroundAlarmDto에 넣어준다 => service에서 닉네임을 찾자
            BackgroundAlarmDto backgroundAlarmDto = new BackgroundAlarmDto();
            backgroundAlarmDto.setImageUrl(res);
            backgroundAlarmDto.setUsername(requestCompleteBackgroundDto.getUsername());

            // background 알람 생성
            alarmService.createBackgroundAlarm(backgroundAlarmDto);
        }


        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/pose")
    public ResponseEntity<?> completePose(@RequestBody RequestCompletePoseDto requestCompletePoseDto) {

        List<String> res = completeService.completePose(requestCompletePoseDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/background")
    public ResponseEntity<?> checkBackground(@RequestParam("background") String imageUrl) {

        String res = completeService.checkBackground(imageUrl);
        if (res == "fail") {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("no_content");
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
