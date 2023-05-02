package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "USER_INFO")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_pk", unique = true, nullable = false)
    private Long userPk;

    @Column(name = "description")
    private String description;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profile_background_url")
    private String profileBackground;

    @Column(name = "profile_img_url")
    private String profileImg;

    @Column(name = "star", nullable = false)
    private Integer star;

    @Column(name = "username", nullable = false)
    private String username;

    // 1:N relation 😀😀
    @OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Gemini> geminis;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Follow> followers = new HashSet<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Follow> followings = new HashSet<>();
}