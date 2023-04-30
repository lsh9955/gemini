package com.gemini.authservice.service;

import com.gemini.authservice.config.auth.PrincipalDetails;
import com.gemini.authservice.model.User;
import com.gemini.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 여기서 사용자를 조회하고, 사용자 정보를 반환하세요.
        // 예를 들어, 다음과 같이 JpaRepository를 사용하여 사용자를 조회할 수 있습니다.
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new PrincipalDetails(user);
    }

}
