package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "emergency_contacts")
public class EmergencyContact {
    @Id
    private String id;
    private String userId;
    private List<Contact> contacts;

    // Constructor
    public EmergencyContact(String userId, List<Contact> contacts) {
        this.userId = userId;
        this.contacts = contacts;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<Contact> getContacts() { return contacts; }
    public void setContacts(List<Contact> contacts) { this.contacts = contacts; }

    // Inner class for Contact details
    public static class Contact {
        private String name;
        private String number;

        public Contact(String name, String number) {
            this.name = name;
            this.number = number;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getNumber() { return number; }
        public void setNumber(String number) { this.number = number; }
    }
}
