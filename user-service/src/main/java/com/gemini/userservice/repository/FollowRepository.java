package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    long countByFollower(Long followerId);
    long countByFollowing(Long followingId);
}
