package com.gemini.userservice.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicReference;

import javax.servlet.http.HttpServletResponse;

import com.gemini.userservice.dto.request.RequestContractGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
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

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    // 컨트롤러가 text/event-stream 미디어 유형의 데이터를 반환함
    // 인코딩 에러 고침
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE + ";charset=UTF-8")
    public SseEmitter streamSseMvc(@RequestParam(value = "nickname", required = false) String nickname, HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-store");

        // SseEmitter 객체 생성
        SseEmitter emitter = new SseEmitter();

        // ExecutorService 객체 생성
        ExecutorService sseMvcExecutor = Executors.newSingleThreadExecutor();

        final String finalNickname = nickname;

        // 이전 알람 리스트를 저장할 변수
        AtomicReference<List<Alarm>> previousAlarms = new AtomicReference<>(new ArrayList<>());

        // 배치 크기 설정
        int batchSize = (int) alarmRepository.countByNickname(finalNickname);

        // ExecutorService에 작업을 제출하여 비동기적으로 SSE 이벤트 생성 및 전송
        sseMvcExecutor.execute(() -> {
            try {
                while (true) {
                    // AlarmRepository에서 최근 알림 데이터를 가져옴
                    Optional<List<Alarm>> alarms = alarmRepository.findByNickname(finalNickname);
                    List<ResponseAlarmDto> responseAlarmDtos = new ArrayList<>();

                    // 가져온 알림 데이터를 ResponseAlarmDto로 변환하여 SSE 이벤트로 전송
                    alarms.ifPresent(alarmList -> {
                        // 이전 알람 리스트와 새로운 알람 리스트가 다른 경우에만 이벤트를 보내도록 수정
                        if (!alarmList.equals(previousAlarms.get())) {
                            alarmList.forEach(alarm -> {
                                try {
                                    ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                                            .geminiNo(alarm.getGeminiNo())
                                            .alarmId(alarm.getAlarmId())
                                            .memo(alarm.getMemo())
                                            .category(alarm.getCategory())
                                            .follower(alarm.getFollower())
                                            .imageUrl(alarm.getImageUrl())
                                            .nickname(alarm.getNickname())
                                            .build();
                                    responseAlarmDtos.add(responseAlarmDto);
                                } catch (Exception e) {
                                    // 에러가 발생해도 무시하고 다음 시행으로 넘어갑니다.
                                    System.err.println("Error sending SSE event: " + e.getMessage());
                                }
                            });

                            try {
                                SseEmitter.SseEventBuilder event = SseEmitter.event()
                                        .data(responseAlarmDtos);
                                emitter.send(event);

                                // 이전 알람 리스트를 새로운 알람 리스트로 업데이트
                                previousAlarms.set(new ArrayList<>(alarmList));
                            } catch (IOException e) {
                                System.err.println("Error sending SSE event: " + e.getMessage());
                            }
                        }
                    });

                    // SSE 연결 유지
                    Thread.sleep(7000);
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
