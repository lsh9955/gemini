package com.gemini.userservice.repository;

import com.gemini.userservice.entity.AlarmUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlarmUserRepository extends CrudRepository<AlarmUser, Long> {

    Optional<AlarmUser> findByUserNo(Long userNo);

}
