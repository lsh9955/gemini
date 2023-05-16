package com.gemini.userservice.repository;

import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.entity.UserPose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPoseRepository extends JpaRepository<UserPose, Long> {

    List<UserPose> findByUserInfo(UserInfo userInfo);
}
