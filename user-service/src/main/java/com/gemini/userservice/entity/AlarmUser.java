package com.gemini.userservice.entity;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@RedisHash("alarm:user")
@Entity
public class AlarmUser {

    @Id
    private Long userNo;

//    private List<Long> alarmIds;
}


