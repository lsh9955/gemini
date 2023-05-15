package com.gemini.rankingservice.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "tag")
public class Tag {

    @Id
    @Column(name = "tag_no")
    private Long tagNo;

    @Column(name = "prompt")
    private String prompt;

    @ManyToOne
    @JoinColumn(name = "category_no")
    private Category categoryNo;
}
