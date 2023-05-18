package com.gemini.rankingservice.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@RedisHash("reward:weekly")
public class Weekly {

    @Id
    private Long galleryNo;

    private List<String> emotionUrls;
}
