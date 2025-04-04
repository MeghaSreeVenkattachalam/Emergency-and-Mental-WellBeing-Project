package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(String username, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }
        String encryptedPassword = passwordEncoder.encode(password);
        User user = new User(username, email, encryptedPassword);
        userRepository.save(user);
        return "User registered successfully!";
    }

    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.filter(u -> passwordEncoder.matches(password, u.getPassword()));
    }
}
