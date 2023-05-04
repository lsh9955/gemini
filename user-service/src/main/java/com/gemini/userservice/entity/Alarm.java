package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "send-id", nullable = false)
    private String sender;

    @Column(name = "alarm-memo", nullable = false)
    private Long alarm_memo;

    @Column(name = "check-memo")
    private boolean check_memo;

    @ManyToOne
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk", nullable = false)
    private UserInfo userInfo;


}
