package com.gemini.userservice.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/alarm")
public class AlarmApiController {

    // emitter 사용 전
//    @GetMapping
//    public void sse(final HttpServletResponse response) throws IOException, InterruptedException {
//
//        // 응답의 mine 타입을 text/event-stream 으로 설정 => MINE 타입: 서버에서 이벤트 스트립을 클라이언트에게 전송할 떄 사용되는 표준 타입
//        response.setContentType("text/event-stream");
//        response.setCharacterEncoding("UTF-8");
//
//        // 전송할 writer 객체 생성
//        Writer writer = response.getWriter();
//
//        for (int i = 0; i < 20; i++) {
//            // SSE 데이터를 작성하여 응답으로 전송
//            writer.write("data: " + System.currentTimeMillis() + "\n\n");
//            writer.flush(); // 꼭 flush 해주어야 한다.
//            Thread.sleep(1000); // 1초 대기
//        }
//
//        writer.close();
//    }
    @GetMapping
    public SseEmitter streamSseMvc() {
        // SseEmitter 객체 생성
        SseEmitter emitter = new SseEmitter();

        // ExecutorService 객체 생성
        ExecutorService sseMvcExecutor = Executors.newSingleThreadExecutor();

        // ExecutorService에 작업을 제출하여 비동기적으로 SSE 이벤트 생성 및 전송
        sseMvcExecutor.execute(() -> {
            try {
                for (int i = 0; i < 20; i++) {
                    // SSE 이벤트를 생성하여 데이터를 설정
                    SseEmitter.SseEventBuilder event = SseEmitter.event()
                            .data(System.currentTimeMillis());
                    // 생성된 이벤트를 SseEmitter로 전송
                    emitter.send(event);
                    Thread.sleep(1000);
                }
            } catch (Exception ex) {
                // 에러 발생 시 SseEmitter를 종료
                emitter.completeWithError(ex);
            }
        });
        // 완료된 SseEmitter 객체 반환
        return emitter;
    }

}
