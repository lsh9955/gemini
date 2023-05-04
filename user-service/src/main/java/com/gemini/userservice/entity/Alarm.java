package com.gemini.userservice.entity;

import lombok.*;

import javax.persistence.*;

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

    @Column(name = "send_id")
    private String sender;

    @Column(name = "memo")
    private Long memo;

    @Column(name = "checked")
    private Boolean checked;

    @ManyToOne
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk")
    private UserInfo userInfo;


}
