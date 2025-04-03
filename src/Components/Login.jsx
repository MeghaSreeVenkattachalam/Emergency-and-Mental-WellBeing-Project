import React, { useState } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Form Validation
    const validateForm = () => {
        let newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
    
        setLoading(true);
        setErrorMsg("");
    
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password
            });
    
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            navigate("/mental-wellbeing");
    
        } catch (error) {
            setErrorMsg(error.response?.data.message || error.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login_section">
            <form onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter Your Email" 
                    onChange={(event) => setEmail(event.target.value)} 
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter Your Password" 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <div className='login_btn'>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </div>
                
                <div>
                    <p>
                        <Link to="#">Forgot Password?</Link> | <Link to="/signup">Create an Account</Link>
                    </p>
                </div>

                {errorMsg && <p className="error">{errorMsg}</p>}
            </form>
        </div>
    );
};
