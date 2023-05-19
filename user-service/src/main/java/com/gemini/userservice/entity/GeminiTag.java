package com.gemini.userservice.entity;

import lombok.*;

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

    private String prompt;
}
