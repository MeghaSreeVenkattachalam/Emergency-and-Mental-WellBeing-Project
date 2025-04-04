package com.example.repository;

import com.example.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface EmergencyContactRepository extends MongoRepository<EmergencyContact, String> {
    Optional<EmergencyContact> findByUserId(String userId);
}
