package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Pairchild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PairchildRepository extends JpaRepository<Pairchild, Long> {
}
