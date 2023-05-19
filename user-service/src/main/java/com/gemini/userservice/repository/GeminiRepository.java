package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeminiRepository extends JpaRepository<Gemini, Long>, CustomGeminiRepository {

    List<Gemini> findByUserInfoOrderByGeminiNoDesc(UserInfo userInfo);

    Gemini findByGeminiNo(Long geminiNo);

    Gemini findByImageUrl(String imageUrl);

    List<Gemini> findByUserInfo(UserInfo userInfo);

}
