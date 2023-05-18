package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_pose")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserPose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_pose_no")
    private Long userPoseNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userInfo", nullable = false)
    private UserInfo userInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pose", nullable = false)
    private Pose pose;
}
