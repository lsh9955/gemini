package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_no")
    private Long tagNo;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "prompt")
    private String prompt;

    @ManyToOne
    @JoinColumn(name = "category_no")
    private Category category;
}
