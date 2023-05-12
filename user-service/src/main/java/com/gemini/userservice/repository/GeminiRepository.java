package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeminiRepository extends JpaRepository<Gemini, Long>, CustomGeminiRepository {

    Gemini findByGeminiNo(Long geminiNo);

    List<Gemini> findByUserInfo(UserInfo userInfo);

}
