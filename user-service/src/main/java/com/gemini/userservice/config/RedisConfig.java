package com.gemini.userservice.config;

import com.gemini.userservice.entity.Alarm;
import com.gemini.userservice.entity.AlarmData;
import com.gemini.userservice.entity.AlarmUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.password}")
    private String password;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
        redisConfiguration.setHostName(host);
        redisConfiguration.setPort(port);
        redisConfiguration.setPassword(password);
        return new LettuceConnectionFactory(redisConfiguration);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<Long, AlarmData> redisAlarmDataTemplate() {
        RedisTemplate<Long, AlarmData> redisAlarmDataTemplate = new RedisTemplate<>();
        redisAlarmDataTemplate.setConnectionFactory(redisConnectionFactory());
        redisAlarmDataTemplate.setKeySerializer(new StringRedisSerializer());
        redisAlarmDataTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
        return redisAlarmDataTemplate;
    }

    @Bean
    public RedisTemplate<Long, AlarmUser> redisAlarmUserTemplate() {
        RedisTemplate<Long, AlarmUser> redisAlarmUserTemplate = new RedisTemplate<>();
        redisAlarmUserTemplate.setConnectionFactory(redisConnectionFactory());
        redisAlarmUserTemplate.setKeySerializer(new StringRedisSerializer());
        redisAlarmUserTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
        return redisAlarmUserTemplate;
    }
}