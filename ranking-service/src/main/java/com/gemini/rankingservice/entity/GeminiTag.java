package com.gemini.rankingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Document(collection = "gemini_tag")
public class GeminiTag {

    @Id
    private Long geminiNo;

    private List<Long> tagIds;
}

