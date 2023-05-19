package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_no")
    private Long categoryNo;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "categoryNo", cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();
}
