// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === formData.email && user.password === formData.password);
    if (user) {
      console.log('Login successful:', user);
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('userType', user.userType);
      navigate(user.userType === 'buyer' ? '/' : '/seller-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;


