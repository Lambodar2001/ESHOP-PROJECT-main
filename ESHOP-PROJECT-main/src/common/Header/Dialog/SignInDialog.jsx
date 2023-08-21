import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './SignInDialog.css';

export default function SignInDialog() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = () => {
    fetch('http://localhost:3001/api/v1/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('AUTH_TOKEN', JSON.stringify(data));
        setLoggedIn(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignIn = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate('/product-page');
    }
  }, [navigate, loggedIn]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

 

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="formflex-container">
          <h2>Login</h2>
          <div>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="username" className="form-label">
                UserName
              </label>
              <input
                type="email"
                className="form-input"
                name="email"
                placeholder="Enter Username..."
                required
                value={loginData.email}
                onChange={handleSignIn}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                name="password"
                placeholder="Enter Password..."
                required
                value={loginData.password}
                onChange={handleSignIn}
              />
              <button type="submit" className="btn-signIn">
                Login
              </button>
            </form>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
