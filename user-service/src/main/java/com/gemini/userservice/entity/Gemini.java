package com.gemini.userservice.entity;

import lombok.*;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "GEMINI")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Gemini {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gemini_no")
    private Long geminiNo;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "total_like", nullable = false)
    private Integer totalLike;

    @Column(name = "seed", nullable = false)
    private Long seed;

    @Column(name = "is_public")
    private Boolean isPublic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk")
    private UserInfo userInfo;

    // 1:N relation 😀
    @OneToMany(mappedBy = "gemini", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Like> likes;

    @OneToOne(mappedBy = "gemini", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_no")
    private Gallery gallery;

    public void updateLikes(Integer totalLike) {
        this.totalLike = totalLike;
    }

    public void contract(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public void updateIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateDescription(String description) {
        this.description = description;
    }
}