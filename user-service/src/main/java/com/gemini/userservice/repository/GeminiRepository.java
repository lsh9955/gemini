package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeminiRepository extends JpaRepository<Gemini, Long>, CustomGeminiRepository {

    List<Gemini> findByUserInfo(UserInfo userInfo);
//    List<Gemini> findByUserInfoAndIsPublic(UserInfo userInfo, boolean isPublic);
//    List<Gemini> findByUserInfoAndIsPublic(UserInfo userInfo, boolean isPublic); // 😀이거 상속받음.

//    List<Gemini> findByUserPkAndIsPublic(Long userPk, boolean isPublic);



//    List<Gemini> findByUserInfo_UserPkAndIsPublic(Long userPk, boolean isPublic);

//    List<Gemini> findByUserPkAndIsPublic(Long userPk, boolean isPublic);





}
