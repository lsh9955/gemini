package com.gemini.userservice.api;


import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.request.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;
import com.gemini.userservice.service.AlarmService;
import com.gemini.userservice.service.EmitterService;
import com.gemini.userservice.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/gemini")
public class GeminiApiController {

    @Autowired
    private EmitterService emitterService;

    @Autowired
    private AlarmService alarmService;

    private final GeminiService geminiService;

    @GetMapping("/{category_no}")
    public ResponseEntity<ResponseTagDto> getTag(@PathVariable("category_no") Long categoryNo) {

        ResponseTagDto responseTagDto = geminiService.getTag(categoryNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseTagDto);
    }

    @GetMapping("")
    public ResponseEntity<Integer> getStar(@RequestHeader("X-Username") String username) {

        Integer star = geminiService.getStar(username);
        return ResponseEntity.status(HttpStatus.OK).body(star);
    }


    @PostMapping("")
    public ResponseEntity<?> generateGemini(@RequestHeader("X-Username") String username,
                                            @RequestBody RequestGenerateGeminiDto requestGenerateGeminiDto) {


        ResponseGenerateGeminiDto res = geminiService.generateGemini(requestGenerateGeminiDto, username);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeGemini(@RequestBody RequestCompleteGeminiDto requestCompleteGeminiDto) {

        Long res = geminiService.completeGemini(requestCompleteGeminiDto);

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
}
