package com.example.repository;

import com.example.model.Mood;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MoodRepository extends MongoRepository<Mood, String> {
    List<Mood> findByUserId(String userId);
    Optional<Mood> findByUserIdAndTimestamp(String userId, LocalDateTime timestamp);
}