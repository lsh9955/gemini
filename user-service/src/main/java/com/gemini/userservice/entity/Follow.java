package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "FOLLOW")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_pk", unique = true, nullable = false)
    private Long followPk;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower", nullable = false)
    private UserInfo follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following", nullable = false)
    private UserInfo following;
//
//
//
}