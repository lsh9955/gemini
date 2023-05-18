package com.gemini.userservice.api;

import com.gemini.userservice.dto.request.RequestContractGeminiDto;
import com.gemini.userservice.dto.response.ResponseGetAllAlarmsDto;
import com.gemini.userservice.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.entity.Alarm;
//import com.gemini.userservice.repository.AlarmRepository;
import com.gemini.userservice.service.AlarmService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/alarms")
public class AlarmApiController {

//    private final AlarmRepository alarmRepository;

    private final AlarmService alarmService;

    private final ThreadPoolTaskExecutor taskExecutor;


    private final UserInfoRepository userInfoRepository;

    // 컨트롤러가 text/event-stream 미디어 유형의 데이터를 반환함
    // 인코딩 에러 고침

    @GetMapping("/subscribe")
    public ResponseEntity<SseEmitter> subscribe(@RequestParam("nickname")String nickname) {
        // Authentication을 UserDto로 업캐스팅

        SseEmitter res = alarmService.subscribe(nickname);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("")
    public ResponseEntity<ResponseGetAllAlarmsDto> getAllAlarms(@RequestHeader("X-Username") String username) {

        ResponseGetAllAlarmsDto responseGetAllAlarmsDto = alarmService.getAllAlarms(username);
        if (responseGetAllAlarmsDto == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGetAllAlarmsDto);
    }

    @PostMapping("/gemini")
    public ResponseEntity<?> contractGemini(@RequestHeader("X-Username") String username,
                                            @RequestBody RequestContractGeminiDto requestContractGeminiDto) {

        String res = alarmService.contractGemini(username, requestContractGeminiDto);
        if (res == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


    @DeleteMapping("/{alarmId}")
    public ResponseEntity<String> deleteAlarm(@RequestHeader("X-Username") String username, @PathVariable("alarmId") Long alarmId) {
        try {
            alarmService.deleteAlarm(username, alarmId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("알람을 찾을 수 없습니다.");
        }
    }

}
