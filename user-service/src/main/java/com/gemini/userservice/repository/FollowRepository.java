package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Follow;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    long countByFollower(Long followerId);
    long countByFollowing(Long followingId);

    Optional<Follow> findByFollowerAndFollowing(UserInfo follower, UserInfo following);
}
