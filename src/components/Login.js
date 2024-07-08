import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from './firebase'; // Import Firebase functions
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from './firebase'; // Import db instance from Firebase config file
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if the user already exists in your database
      const userSnapshot = await getDoc(doc(db, 'users', result.user.email));
      if (userSnapshot.exists()) {
        console.log("Logged in with Google:", result.user);
        navigate('/'); // Redirect to Home page if user exists
      } else {
        // Redirect to signup page or handle accordingly
        navigate('/signup');
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user);
      navigate('/'); // Redirect to Home page
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  return (
    <div className='page'>
      <form onSubmit={handleSubmit}>
        <div className='login'>
          <div className='place'>
            <label className='font' htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Email'
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='place'>
            <label className='font' htmlFor="password">Password</label>
            <input
              placeholder='Password'
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='submit' type="submit">Login</button>
          <button className='google-login' onClick={handleGoogleLogin}>
        Login with Google
      </button>
        </div>
      </form>
      
      {/* Google Login Button */}
      
    </div>
  );
}

export default Login;
