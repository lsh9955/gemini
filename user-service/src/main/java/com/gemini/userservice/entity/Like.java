package com.gemini.userservice.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "`LIKE`")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_pk", unique = true, nullable = false)
    private Long likePk;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gemini_id", nullable = false)
    private Gemini gemini;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_info_id", nullable = false)
    private UserInfo userInfo;

}
