import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      if (email === email.toLowerCase()) {
        setError('Invalid email address.');
      } else {
        setError('Email address should not contain uppercase letters.');
      }
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
      );
      return;
    }

    // Simulate login success and navigate to Home page
    setError('');
    alert(`Logged in successfully as ${email}`);
    setEmail('');
    setPassword('');
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div style={styles.back} className='font-bold text-2xl  p-2 overflow-hidden '>
    <h1 className='flex text-gray-400 justify-top items-left'>MovieMania</h1>
   
    <div style={styles.container}>
      
      <div style={styles.formContainer}>
        <h1 className="text-black " style={styles.title}>
          <b>
            <u>Login</u>
          </b>
        </h1>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="py-1 text-red-600" style={styles.error}>
              *{error}
            </p>
          )}
          <button
            className="mt-8 bg-blue-500 text-white hover:bg-blue-600 "
            type="submit"
            style={styles.button}
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

const styles = {
  back :{
    backgroundImage: "url('./login.jpg ')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    height: '100vh',
    
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
     // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '10px',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.71)', // Semi-transparent white background
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    // color: '#333',
    fontSize: '28px',
    textShadow: '0px 4px 6px rgba(255, 255, 255, 0)',
  },
  inputGroup: {
    marginBottom: '15px',
    
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '17px',
    color: 'black',
    fontWeight :'bold',
    boxShadow: '0px 2px 4px rgba(255, 255, 255, 0)',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    
  },
  button: {

    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  error: {
    //  color: 'red',
    fontSize: '15px',
    marginBottom: '10px',
    // boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.4)',
  },
};

export default LoginPage;
