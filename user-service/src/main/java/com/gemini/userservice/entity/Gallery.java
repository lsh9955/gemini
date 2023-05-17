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
    private Integer dailyLike;

    @Column(name = "weekly_like")
    private Integer weeklyLike;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gemini_no")
    private Gemini gemini;

    public void updateLikes(Integer dailyLike, Integer weeklyLike) {
        this.dailyLike = dailyLike;
        this.weeklyLike = weeklyLike;
    }

}