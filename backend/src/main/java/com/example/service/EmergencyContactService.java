package com.example.service;

import com.example.model.EmergencyContact;
import com.example.repository.EmergencyContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmergencyContactService {

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;

    // Fetch user's emergency contacts
    public EmergencyContact getEmergencyContacts(String userId) {
        return emergencyContactRepository.findByUserId(userId).orElse(new EmergencyContact(userId, null));
    }

    // Save or update emergency contacts
    public EmergencyContact saveEmergencyContacts(EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }
}
