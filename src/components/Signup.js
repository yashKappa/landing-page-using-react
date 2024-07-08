import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './signup.css'; 
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid
      });

      console.log("User signed up and data stored:", user);
      navigate('/'); // Redirect to Home page
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid
      });

      console.log("User signed up with Google and data stored:", user);
      navigate('/'); // Redirect to Home page
    } catch (error) {
      console.error("Error signing up with Google:", error);
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
              required
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
              required
            />
          </div>
          <div className='place'>
            <label className='font' htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='error'>{error}</p>}
          <button className='submit' type="submit">Sign Up</button>
          <button className='google-signup' type="button" onClick={handleGoogleSignup}>
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
