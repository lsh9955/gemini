// UserRepository interface
package com.gemini.userservice.repository;

import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsername(String username);
    Optional<UserInfo> findByNickname(String nickname);
}
