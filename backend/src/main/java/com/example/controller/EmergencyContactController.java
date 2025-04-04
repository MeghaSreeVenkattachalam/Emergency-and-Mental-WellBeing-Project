package com.example.controller;

import com.example.model.EmergencyContact;
import com.example.service.EmergencyContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emergency-contacts")
public class EmergencyContactController {

    @Autowired
    private EmergencyContactService emergencyContactService;

    // Fetch emergency contacts for a user
    @GetMapping("/{userId}")
    public EmergencyContact getEmergencyContacts(@PathVariable String userId) {
        return emergencyContactService.getEmergencyContacts(userId);
    }

    // Save or update emergency contacts
    @PostMapping
    public EmergencyContact saveEmergencyContacts(@RequestBody EmergencyContact emergencyContact) {
        return emergencyContactService.saveEmergencyContacts(emergencyContact);
    }
}
