// UserRepository interface
package com.gemini.userservice.repository;

import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
}
