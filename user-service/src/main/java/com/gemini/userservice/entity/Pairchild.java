package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "PAIRCHILD")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pairchild {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pairchild_id", unique = true, nullable = false)
    private Long pairchildId;

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", nullable = false)
    private String image;
}