package com.example.controller;

import com.example.model.Assessment;
import com.example.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")  // ✅ Allow React frontend to call API
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    // ✅ Submit Assessment
    @PostMapping("/save")
    public ResponseEntity<?> submitAssessment(@RequestBody Map<String, Object> payload) {
        String userId = (String) payload.get("userId");  // Extract user ID from frontend
        int score = (int) payload.get("score");  // Extract calculated score

        Assessment savedAssessment = assessmentService.saveAssessment(userId, score);
        return ResponseEntity.ok(savedAssessment);
    }

    // ✅ Get Assessment History
    @GetMapping("/history")
    public ResponseEntity<List<Assessment>> getAssessmentHistory(@RequestParam String userId) {
        List<Assessment> history = assessmentService.getUserHistory(userId);
        return ResponseEntity.ok(history);
    }
}
