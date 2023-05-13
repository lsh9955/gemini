package com.gemini.rankingservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "gemini")
public class Gemini {

    @Id
    @Column(name = "gemini_no")
    private Long geminiNo;

    @Column(name = "seed", nullable = false)
    private Long seed;

    @OneToOne(mappedBy = "gemini", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_no")
    @JsonIgnore
    private Gallery gallery;
}
