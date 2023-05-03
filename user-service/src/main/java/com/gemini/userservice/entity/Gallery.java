package com.gemini.userservice.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "GALLERY")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gallery_no")
    private Long galleryNo;

    @Column(name = "daily_like")
    private Long dailyLike;

    @Column(name = "weekly_like")
    private Long weeklyLike;

    @OneToOne
    @JoinColumn(name = "gemini_no")
    private Gemini gemini;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private UserInfo userInfo;
}