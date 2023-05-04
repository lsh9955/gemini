package com.gemini.userservice.service;

import com.gemini.userservice.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface AlarmService {

    @Autowired
    private final FollowRepository followRepository;
}
