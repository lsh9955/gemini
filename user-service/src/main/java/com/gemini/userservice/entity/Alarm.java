package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
//@RedisHash("alarm")
@Entity
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long alarmId;

    private Integer category;

    private String imageUrl;

    private Long geminiNo;

    private String memo;

    private String follower;

}
