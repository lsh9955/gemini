package com.gemini.userservice.repository;

import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.entity.UserPose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPoseRepository extends JpaRepository<UserPose, Long> {

    List<UserPose> findByUserInfoOrderByUserPoseNoDesc(UserInfo userInfo);
}
