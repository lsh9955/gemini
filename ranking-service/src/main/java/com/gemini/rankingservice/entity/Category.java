package com.gemini.rankingservice.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "category_no")
    private Long categoryNo;

    @OneToMany(mappedBy = "categoryNo", cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();
}
