package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Pose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoseRepository extends JpaRepository<Pose, Long> {

    Pose findByPoseNo(Long poseNo);
}
