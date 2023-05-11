package com.gemini.userservice.api;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.entity.Alarm;
import com.gemini.userservice.repository.AlarmRepository;
import com.gemini.userservice.service.AlarmService;

@RestController
@RequestMapping("/alarms")
public class AlarmApiController {

    @Autowired
    private AlarmRepository alarmRepository;

    @Autowired
    private AlarmService alarmService;

    // 컨트롤러가 text/event-stream 미디어 유형의 데이터를 반환함
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamSseMvc(@RequestParam(value="nickname", required=false) String nickname, HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-store");
        System.out.println("nickname");
        System.out.println(nickname);
        System.out.println("기도 많이 할게요");

        // SseEmitter 객체 생성
        SseEmitter emitter = new SseEmitter();

        // ExecutorService 객체 생성
        ExecutorService sseMvcExecutor = Executors.newSingleThreadExecutor();

        Long latestAlarm = alarmRepository.findTopByOrderByIdDesc().getId();

        final String finalNickname = nickname;

        // ExecutorService에 작업을 제출하여 비동기적으로 SSE 이벤트 생성 및 전송
        sseMvcExecutor.execute(() -> {
            try {
                while (true) {
                    // AlarmRepository에서 최근 알림 데이터를 가져옴
                    Optional<List<Alarm>> alarms = alarmRepository.findByOrderByCreatedAtDesc(finalNickname);

                    // 가져온 알림 데이터를 ResponseAlarmDto로 변환하여 SSE 이벤트로 전송
                    alarms.ifPresent(alarmList -> {
                        alarmList.forEach(alarm -> {
                            try {
                                ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                                        .alarmId(alarm.getId())
                                        .latestAlarmId(latestAlarm)
                                        .memo(alarm.getMemo())
                                        .checked(alarm.getChecked())
                                        .category(alarm.getCategory())
                                        .build();

                                SseEmitter.SseEventBuilder event = SseEmitter.event()
                                        .data(responseAlarmDto);
                                emitter.send(event);
                            } catch (IOException e) {
                                // 에러가 발생해도 무시하고 다음 시행으로 넘어갑니다.
                                System.err.println("Error sending SSE event: " + e.getMessage());
                            }
                        });
                    });

                    // SSE 연결 유지
                    Thread.sleep(5000);
                }
            } catch (Exception ex) {
                // 에러 발생 시 SseEmitter를 종료
                emitter.completeWithError(ex);
            }
        });
        // 완료된 SseEmitter 객체 반환
        return emitter;
    }

    @PostMapping("/gemini")
    public ResponseEntity<?> contractGemini(@RequestHeader("X-Username") String username,
                                           @RequestBody Map<String, Long> geminiMap) {

        Long geminiNo = geminiMap.get("gemini_no");
        String res = alarmService.contractGemini(username, geminiNo);
        if (res == "fail") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
