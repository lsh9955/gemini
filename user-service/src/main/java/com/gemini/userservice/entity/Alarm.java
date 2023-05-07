package com.gemini.userservice.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ALARM")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "memo")
    private String memo;

    @Column(name = "checked")
    private Boolean checked;

    @Column(name = "category")
    private Integer category;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk")
    private UserInfo userInfo;


}
