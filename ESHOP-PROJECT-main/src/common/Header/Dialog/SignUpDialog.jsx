import React, { useState } from 'react';
import Header from '../Header';

export default function SignUpDialog() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
  });

  const [error, setError] = useState(null);


  const registerUser = () => {
    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((err) => {
         setError(err.message);
      });
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="formflex-container">
          <h2>Register</h2>
          <form>
            <label htmlFor="firstName" className="form-label">
              FirstName
            </label>
            <input
              type="text"
              className="form-input"
              name="firstName"
              placeholder="Enter firstname..."
              value={formData.firstName}
              onChange={handleInputChange}
              required
              style={{width:'95%'}}
            />
            <label htmlFor="lastName" className="form-label">
              LastName
            </label>
            <input
              type="text"
              className="form-input"
              name="lastName"
              placeholder="Enter lastname..."
              value={formData.lastName}
              onChange={handleInputChange}
              required
              style={{width:'95%'}}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-input"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{width:'95%'}}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              name="password"
              placeholder="Enter Password..."
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{width:'95%'}}
            />
            <label htmlFor="contactNumber" className="form-label">
              Mobile No
            </label>
            <input
              type="number"
              className="form-input"
              name="contactNumber"
              placeholder="Enter Mobile No..."
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              style={{width:'95%'}}
            />
            <button type="button" className="btn-signUp" onClick={registerUser}>
              Register
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}
