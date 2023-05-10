package com.gemini.userservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "background")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Background {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "background_no")
    private Long backgroundNo;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}
