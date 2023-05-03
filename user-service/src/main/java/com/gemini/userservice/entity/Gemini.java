package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "GEMINI")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Gemini {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    @Column(name = "total_like", nullable = false)
    private Integer totalLike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk", nullable = false)
    private UserInfo userInfo;

    // 1:N relation 😀
    @OneToMany(mappedBy = "gemini", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Like> likes;

    @OneToOne(mappedBy = "gemini", cascade = CascadeType.ALL)
    @JoinColumn(name = "gallery_no")
    private Gallery gallery;
}