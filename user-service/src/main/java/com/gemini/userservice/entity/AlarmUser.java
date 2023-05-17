package com.gemini.userservice.entity;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import java.util.List;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@RedisHash("alarm:user")
public class AlarmUser {

    @Id
    private Long userNo;

    private List<Long> alarmIds;

    public void update(List<Long> alarmIds) {

        this.alarmIds = alarmIds;
    }
}


