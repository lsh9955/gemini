package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@RedisHash("alarm:data")
public class AlarmData {

    @Id
    private Long alarmId;

    private Integer category;

    private String imageUrl;

    private Long geminiNo;

    private Long galleryNo;

    private String memo;

    private String follower;
}
