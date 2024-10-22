import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auth, signOut, db, signInWithPopup, GoogleAuthProvider } from './components/firebase';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Orders from './components/Orders';
import Signup from './components/Signup';
import Shopping from './components/Shopping';
import Cart from './components/Cart';
import Upload from './components/Upload';
import Favorites from './components/Favorites';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [activeLink, setActiveLink] = useState('/');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setProfileImage(user.photoURL || 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png');
      } else {
        setUser(null);
        setProfileImage('https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }

      navigate('/');
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  const handleNavClick = (path) => {
    setActiveLink(path);
    toggleMobileMenu();
  };

  return (
    <div className="App">
      <header>
        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <img src='https://cdn-icons-png.freepik.com/512/5610/5610967.png' alt="Close Menu" />
          ) : (
            <img src='https://i.pinimg.com/originals/26/9d/d1/269dd16fa1f5ff51accd09e7e1602267.png' alt="Open Menu" />
          )}
        </div>
        <span className='logo'>
          <img src='https://www.pngall.com/wp-content/uploads/15/Disney-Cars-PNG-Image.png' alt='Logo' />Aapolo
        </span>
        <div className='bgo'>
          {user ? (
            <div className="profile-container">
              {profileImage && (
                <img src={profileImage} alt="Profile" className="profile-image" />
              )}
              <div className="dropdown-content">
                <Link className='logout' onClick={() => { handleLogout(); toggleMobileMenu(); }}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Link>
              </div>
            </div>
          ) : (
            <div className="profile-container">
              <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="Default Profile" className="profile-image" />
              <div className="dropdown-content">
                <Link className='log' to="/login" onClick={toggleMobileMenu}>
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
                <Link className='logup' to="/signup" onClick={toggleMobileMenu}>
                  <i className="fas fa-user-plus"></i> Sign Up
                </Link>
                <Link className='google' type="button" onClick={handleGoogleSignup}>
                  <img src='google.png' alt='img' /> <span className='gogo'>Continue with Google</span>
                </Link>
              </div>
            </div>
          )}
        </div>
        <nav className={isMobileMenuOpen ? 'mobile-menu' : ''}>
          <ul>
            <li>
              <Link to="/" className={activeLink === '/' ? 'Active' : ''} onClick={() => handleNavClick('/')}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={activeLink === '/about' ? 'Active' : ''} onClick={() => handleNavClick('/about')}>
                <i className="fas fa-info-circle"></i> About
              </Link>
            </li>
            <li>
              <Link to="/Contact" className={activeLink === '/Contact' ? 'Active' : ''} onClick={() => handleNavClick('/Contact')}>
                <i className="fa-solid fa-address-book"></i> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/orders" className={activeLink === '/orders' ? 'Active' : ''} onClick={() => handleNavClick('/orders')}>
                <i className="fas fa-box"></i> Orders
              </Link>
            </li>
            <li>
              <Link to="/shopping" className={activeLink === '/shopping' ? 'Active' : ''} onClick={() => handleNavClick('/shopping')}>
                <i className="fas fa-shopping-bag"></i> Shopping
              </Link>
            </li>
            <li>
              <Link to="/Cart" className={activeLink === '/Cart' ? 'Active' : ''} onClick={() => handleNavClick('/Cart')}>
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>
            </li>
            <li>
              <Link to="/Upload" className={activeLink === '/Upload' ? 'Active' : ''} onClick={() => handleNavClick('/Upload')}>
                <i className="fas fa-upload"></i> Upload
              </Link>
            </li>
            <li>
              <Link to="/Favorites" className={activeLink === '/Favorites' ? 'Active' : ''} onClick={() => handleNavClick('/Favorites')}>
                <i className="fas fa-heart"></i> Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
      <div className="bottom-nav">
        <ul>
          <li>
            <Link to="/orders" className={activeLink === '/orders' ? 'active' : ''} onClick={() => handleNavClick('/orders')}>
              <i className="fas fa-box"></i> Orders
            </Link>
          </li>
          <li>
            <Link to="/shopping" className={activeLink === '/shopping' ? 'active' : ''} onClick={() => handleNavClick('/shopping')}>
              <i className="fas fa-shopping-bag"></i> Shopping
            </Link>
          </li>
          <li>
            <Link to="/Cart" className={activeLink === '/Cart' ? 'active' : ''} onClick={() => handleNavClick('/Cart')}>
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </li>
          <li>
            <Link to="/Upload" className={activeLink === '/Upload' ? 'active' : ''} onClick={() => handleNavClick('/Upload')}>
              <i className="fas fa-upload"></i> Upload
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
