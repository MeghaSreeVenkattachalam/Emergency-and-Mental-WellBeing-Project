package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.model.EmergencyContact.Contact;

public interface ContactRepository extends MongoRepository<Contact, String> {
}
