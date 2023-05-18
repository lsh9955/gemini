package com.gemini.userservice.entity;

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
@Document(collection = "pose_image")
public class PoseImage {

    @Id
    private Long poseNo;

    private List<String> images;

    private String background;
}
