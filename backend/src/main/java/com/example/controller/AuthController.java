package com.example.controller;

import com.example.model.User;
import com.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for frontend URL
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public Map<String, String> registerUser(@RequestBody Map<String, String> request) {
        String response = authService.registerUser(request.get("username"), request.get("email"), request.get("password"));
        return Map.of("message", response);
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> request) {
        Optional<User> user = authService.authenticateUser(request.get("email"), request.get("password"));
        if (user.isPresent()) {
            return Map.of("message", "Login Successful", "user", user.get());
        }
        return Map.of("message", "Invalid Credentials");
    }
}
