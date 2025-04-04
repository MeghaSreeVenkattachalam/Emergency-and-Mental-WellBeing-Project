package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.model.Mood;
import com.example.service.MoodService;

import java.util.List;

@RestController
@RequestMapping("/api/moods")
public class MoodController {

    @Autowired
    private MoodService moodService;

    @PostMapping
    public ResponseEntity<Mood> saveMood(@RequestBody Mood mood) {
        return ResponseEntity.ok(moodService.saveOrUpdateMood(mood));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Mood>> getMoodHistory(@PathVariable String userId) {
        return ResponseEntity.ok(moodService.getMoodHistory(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMoodEntry(@PathVariable String id) {
        moodService.deleteMood(id);
        return ResponseEntity.ok("Mood entry deleted successfully.");
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearMoodHistory(@PathVariable String userId) {
        moodService.clearUserMoodHistory(userId);
        return ResponseEntity.ok("All mood history cleared.");
    }
}
