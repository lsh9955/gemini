package com.gemini.userservice.repository;


import com.gemini.userservice.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByTagNo(Long tagNo);
}
