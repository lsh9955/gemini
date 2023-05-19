package com.gemini.rankingservice.repository;

import com.gemini.rankingservice.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByTagNo(Long tagNo);
}
