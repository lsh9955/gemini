package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.Like;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserInfoAndGemini(UserInfo userInfo, Gemini gemini);
}
