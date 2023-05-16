package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "pose")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Pose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pose_no")
    private Long poseNo;

    @OneToMany(mappedBy = "pose", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserPose> userPoses;
}
