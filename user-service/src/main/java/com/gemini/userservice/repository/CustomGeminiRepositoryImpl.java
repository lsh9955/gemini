package com.gemini.userservice.repository;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class CustomGeminiRepositoryImpl implements CustomGeminiRepository {
    @PersistenceContext
    private EntityManager em;


    @Override
    public List<Gemini> findByUserInfoAndIsPublic(UserInfo userInfo, boolean isPublic) {
        System.out.println("제발기도해555");
        String qlString = "select g from Gemini g where g.userInfo = :userInfo and g.isPublic = :isPublic";

        TypedQuery<Gemini> query = em.createQuery(qlString, Gemini.class);
        query.setParameter("userInfo", userInfo);
        query.setParameter("isPublic", isPublic);
        System.out.println("제발기도해66");
        return query.getResultList();
    }
}


