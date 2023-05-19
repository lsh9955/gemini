package com.gemini.rankingservice.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@RedisHash("reward:daily")
public class Daily {

    @Id
    private Long galleryNo;

    private List<String> emotionUrls;
}
