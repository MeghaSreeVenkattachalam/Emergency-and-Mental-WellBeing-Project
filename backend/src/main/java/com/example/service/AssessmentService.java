package com.example.service;

import com.example.model.Assessment;
import com.example.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    // ✅ Save Assessment
    public Assessment saveAssessment(String userId, int score) {
        Assessment assessment = new Assessment();
        assessment.setUserId(userId);
        assessment.setScore(score);
        assessment.setDate(LocalDateTime.now());

        return assessmentRepository.save(assessment);
    }

    // ✅ Fetch Assessment History
    public List<Assessment> getUserHistory(String userId) {
        return assessmentRepository.findByUserId(userId);
    }
}
