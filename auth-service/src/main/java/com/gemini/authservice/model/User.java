package com.gemini.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

import com.gemini.authservice.dto.UserDto;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto? Identity? check later 😶 additional inspection needed
    private Long id; // better datatype for id
    private String username;
    private String password;

//    private String email; // Decided not to use email for now
    private String role; // ROLE_USER, ROLE_ADMIN

    // for OAuth. additional field
    private String provider;
    private String providerId;
    @CreationTimestamp
    private Timestamp createDate;

    public UserDto toUserDto() {
        return UserDto.builder()
                .username(username)
                .createDate(createDate)
                .build();
    }
//
}
