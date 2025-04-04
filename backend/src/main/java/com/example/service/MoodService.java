package com.example.service;

import com.example.model.Mood;
import com.example.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MoodService {
    @Autowired
    private MoodRepository moodRepository;

    public Mood saveOrUpdateMood(Mood mood) {
        if (mood.getUserId() == null || mood.getUserId().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }

        Optional<Mood> existingMood = moodRepository.findByUserIdAndTimestamp(mood.getUserId(), mood.getTimestamp());
        existingMood.ifPresent(existing -> mood.setId(existing.getId()));

        return moodRepository.save(mood);
    }

    public List<Mood> getMoodHistory(String userId) {
        return moodRepository.findByUserId(userId);
    }

    public void deleteMood(String id) {
        moodRepository.deleteById(id);
    }

    public void clearUserMoodHistory(String userId) {
        List<Mood> moods = moodRepository.findByUserId(userId);
        moodRepository.deleteAll(moods);
    }
}