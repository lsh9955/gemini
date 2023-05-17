package com.gemini.userservice.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@Slf4j
public class EmitterRepository {

    // 유저ID를 키로 SseEmitter를 해시맵에 저장할 수 있도록 구현했다.
    private static Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public SseEmitter save(String username, SseEmitter sseEmitter) {
        emitterMap.put(getKey(username), sseEmitter);
        log.info("Saved SseEmitter for {}", username);
        return sseEmitter;
    }

    public Optional<SseEmitter> get(String username) {
        log.info("Got SseEmitter for {}", username);
        return Optional.ofNullable(emitterMap.get(getKey(username)));
    }

    public void delete(String username) {
        emitterMap.remove(getKey(username));
        log.info("Deleted SseEmitter for {}", username);
    }

    private String getKey(String username) {
        return "Emitter:UID:" + username;
    }
}
