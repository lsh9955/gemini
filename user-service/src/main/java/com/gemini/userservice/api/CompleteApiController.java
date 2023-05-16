package com.gemini.userservice.api;

import com.gemini.userservice.dto.Alarm.BackgroundAlarmDto;
import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.BackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.service.AlarmService;
import com.gemini.userservice.service.CompleteService;
import com.gemini.userservice.service.EmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/complete")
public class CompleteApiController {

    @Autowired
    private EmitterService emitterService;

    @Autowired
    private AlarmService alarmService;


    private final CompleteService completeService;

    @PostMapping("/gemini")
    public ResponseEntity<?> completeGemini(@RequestBody RequestCompleteGeminiDto requestCompleteGeminiDto) {

        Long res = completeService.completeGemini(requestCompleteGeminiDto);

        SseEmitter emitter = new SseEmitter();
        emitterService.addEmitter(emitter);


        // res가 null 값이 아니면 알람 생성
        if(res != null) {

            //알림 메세지를 만들기 위해 GeminiAlarmDto에 넣어준다. => service에서 닉네임을 찾아줄 예정
            GeminiAlarmDto geminiAlarmDto = new GeminiAlarmDto();
            geminiAlarmDto.setGeminiNo(res);
            geminiAlarmDto.setUsername(requestCompleteGeminiDto.getUsername());

            //gemini 생성 알림
            alarmService.createGeminiAlarm(geminiAlarmDto,emitter);

        }

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/background")
    public ResponseEntity<?> completeBackground(@RequestBody RequestCompleteBackgroundDto requestCompleteBackgroundDto) {

        String res = completeService.completeBackground(requestCompleteBackgroundDto);

        SseEmitter emitter = new SseEmitter();
        emitterService.addEmitter(emitter);

        // res가 null 값이 아니면 알람 생성
        if (res != null) {
            // 알람 메세지를 만들기 위해 BackgroundAlarmDto에 넣어준다 => service에서 닉네임을 찾자
            BackgroundAlarmDto backgroundAlarmDto = new BackgroundAlarmDto();
            backgroundAlarmDto.setImageUrl(res);
            backgroundAlarmDto.setUsername(requestCompleteBackgroundDto.getUsername());

            // background 알람 생성
            alarmService.createBackgroundAlarm(backgroundAlarmDto, emitter);
        }


        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/pose")
    public ResponseEntity<?> completePose(@RequestBody RequestCompletePoseDto requestCompletePoseDto) {

        List<String> res = completeService.completePose(requestCompletePoseDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
