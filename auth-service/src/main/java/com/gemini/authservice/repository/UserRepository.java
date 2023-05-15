package com.gemini.authservice.repository;

import com.gemini.authservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


//once extend JpaRepository, @Repository annotation does not needed.
public interface UserRepository extends JpaRepository<User, Long> {
    // SELECT * FROM user WHERE username = ?1
    User findByUsername(String username);

    // SELECT * FROM user WHERE provider = ?1 and providerId = ?2
    Optional<User> findByProviderAndProviderId(String provider, String providerId); // 😶 additional inspection needed
}
