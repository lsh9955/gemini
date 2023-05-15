// UserRepository interface
package com.gemini.userservice.repository;

import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsername(String username);
    Optional<UserInfo> findByNickname(String nickname);
}
