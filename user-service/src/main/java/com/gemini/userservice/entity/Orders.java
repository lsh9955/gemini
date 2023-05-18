package com.gemini.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="ORDERS")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", unique = true, nullable = false)
    private Long orderId;

    @Column(name = "order_star", nullable = false)
    private Integer star;

    @Column(name="merchant_uid", nullable = false)
    private String merchantUid;

    @Column(name="order_date_time", nullable= false, updatable = true)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk", nullable = false)
    private UserInfo userInfo;

}
