package com.gemini.rankingservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Entity
@Table(name = "gallery")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"gemini.gallery"})
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gallery_no")
    private Long galleryNo;

    @Column(name = "daily_like")
    private Integer dailyLike;

    @Column(name = "weekly_like")
    private Integer weeklyLike;

    public void updateDaily(Integer dailyLike) {

        this.dailyLike = dailyLike;
    }

    public void updateWeekly(Integer weeklyLike) {

        this.weeklyLike = weeklyLike;
    }

    @OneToOne
    @JoinColumn(name = "gemini_no")
    private Gemini gemini;
}