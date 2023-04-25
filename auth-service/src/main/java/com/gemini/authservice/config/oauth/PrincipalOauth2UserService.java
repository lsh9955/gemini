package com.gemini.authservice.config.oauth;

import com.gemini.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrincipalOauth2UserService {

    @Autowired
    private UserRepository userRepository;
}
