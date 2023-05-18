package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    List<Gallery> findAllByOrderByGalleryNoDesc();

    Gallery findByGalleryNo(Long galleryNo);

    List<Gallery> findByGemini_UserInfo(UserInfo userInfo);

    Gallery findByGemini(Gemini gemini);

    @Query("SELECT g FROM Gallery g WHERE g.gemini.userInfo = :userInfo AND g.gemini.isPublic = true")
    List<Gallery> findPublicGalleriesByUserInfo(UserInfo userInfo);

}
