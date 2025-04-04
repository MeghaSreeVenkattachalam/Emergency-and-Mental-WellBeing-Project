package com.example.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "assessments") // MongoDB Collection
public class Assessment {
    @Id
    private String id;  // Unique ID generated by MongoDB

    private String userId; // User who took the test
    private int score;  // Total test score
    private LocalDateTime date; // Timestamp of test completion
}
