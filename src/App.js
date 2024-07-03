import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ContactForm from './components/ContactForm';
import About from './components/About';
import Feedback from './components/Feedback';
import Login from './components/Login';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <img src='https://cdn-icons-png.freepik.com/512/5610/5610967.png' alt="Close Menu" />
            ) : (
              <img src='https://i.pinimg.com/originals/26/9d/d1/269dd16fa1f5ff51accd09e7e1602267.png' alt="Open Menu" />
            )}
          </div>
          <span>Aapolo</span>
          <nav className={isMobileMenuOpen ? 'mobile-menu' : ''}>
          <ul>
  <li>
    <Link to="/" onClick={toggleMobileMenu}>
      <i className="fas fa-home"></i> Home
    </Link>
  </li>
  <li>
    <Link to="/contact" onClick={toggleMobileMenu}>
      <i className="fas fa-address-book"></i> Contact
    </Link>
  </li>
  <li>
    <Link to="/about" onClick={toggleMobileMenu}>
      <i className="fas fa-info-circle"></i> About
    </Link>
  </li>
  <li>
    <Link to="/feedback" onClick={toggleMobileMenu}>
      <i className="fas fa-comments"></i> Feedback
    </Link>
  </li>
  <div className='go'>
    <Link className='log' to="/login" onClick={toggleMobileMenu}>
      <i className="fas fa-sign-in-alt"></i> Login
    </Link>
  </div>
</ul>

          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
