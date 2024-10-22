import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './home.css';
import { db } from './firebase';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';


function Fetch() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [visibleSection, setVisibleSection] = useState('all');
  const [favorites, setFavorites] = useState([]);

  
  const userId = 'exampleUserId';

  // Fetch user favorites from Firestore
  const fetchFavorites = async () => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setFavorites(userData.favorites || []);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites(); // Fetch favorites when component loads
    fetchData();      // Fetch vehicle data
  }, []);

  // Handle favorite addition
  const handleFavorite = async (vehicle) => {
    if (!favorites.some(fav => fav.id === vehicle.id)) {
      const updatedFavorites = [...favorites, vehicle];
      setFavorites(updatedFavorites);
      
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          await updateDoc(userDocRef, {
            favorites: arrayUnion(vehicle),
          });
        } else {
          await setDoc(userDocRef, {
            favorites: [vehicle],
          });
        }

        console.log('Favorite added successfully');
      } catch (error) {
        console.error('Error saving favorite:', error);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'vehicles'));
      const vehiclesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const shuffledVehicles = shuffleArray(vehiclesData); // Shuffle vehicles after fetching
      setVehicles(shuffledVehicles);
      setSortOrder('default'); // Reset to default on reload
    } catch (error) {
      console.error("Error fetching vehicles: ", error);
      setError('Failed to fetch vehicles. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Function to shuffle array (random order)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReload = () => {
    fetchData();
  };

  const handleBuy = (vehicleId) => {
    console.log(`Buying vehicle with ID: ${vehicleId}`);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Function to clean the price string
  const cleanPrice = (price) => {
    if (typeof price === 'number') {
      return price; // If price is already a number, return it directly
    }
  
    if (typeof price === 'string') {
      return parseInt(price.replace(/,/g, ''), 10); // Remove commas and convert to number
    }
  
    return 0; // If price is undefined or not a valid string, return 0
  };

  const sortedVehicles = useMemo(() => {
    if (sortOrder === 'lowToHigh') {
      return [...filteredVehicles].sort((a, b) => cleanPrice(a.price) - cleanPrice(b.price));
    } else if (sortOrder === 'highToLow') {
      return [...filteredVehicles].sort((a, b) => cleanPrice(b.price) - cleanPrice(a.price));
    }
    return filteredVehicles; // No sorting when sortOrder is 'default'
  }, [filteredVehicles, sortOrder]);

  const cars = sortedVehicles.filter(vehicle => 
    vehicle.vehicleType === 'car' || 
    vehicle.vehicleType === 'sports_car' || 
    vehicle.vehicleType === 'sedan' || 
    vehicle.vehicleType === 'SUV' || 
    vehicle.vehicleType === 'convertible' ||
    vehicle.vehicleType === 'hatchback'
  );

  const bikes = sortedVehicles.filter(vehicle => 
    vehicle.vehicleType === 'bike' || 
    vehicle.vehicleType === 'mountain_bike' || 
    vehicle.vehicleType === 'road_bike' || 
    vehicle.vehicleType === 'electric_bike'
  );
  
  const cycles = sortedVehicles.filter(vehicle => 
    vehicle.vehicleType === 'cycle' || 
    vehicle.vehicleType === 'kids_cycle' || 
    vehicle.vehicleType === 'adult_cycle' || 
    vehicle.vehicleType === 'folding_cycle'
  );

  const handleShare = (vehicle) => {
    const shareText = `Check out this vehicle: ${vehicle.name}, Model: ${vehicle.model}, Price: ₹${vehicle.price}`;
    const shareUrl = vehicle.imageUrl; // You can modify this based on what you want to share
  
    // Example of sharing functionality (you might implement this differently)
    if (navigator.share) {
      navigator.share({
        title: vehicle.name,
        text: shareText,
        url: shareUrl,
      })
      .then(() => console.log('Share successful!'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      console.log('Share this link:', shareUrl);
      alert(`Share this link: ${shareUrl}`); // You can customize this behavior
    }
  };
  
  
  const renderVehicleGrid = (vehicles) => (
    <div className="vehicle-grid">
      {vehicles.map((vehicle) => (
        <div className="vehicle-box" key={vehicle.id}>
          <span 
            className={`favorite-icon ${favorites.some(fav => fav.id === vehicle.id) ? 'active' : ''}`} 
            onClick={() => handleFavorite(vehicle)}
          >
            <i className="fa-solid fa-heart"></i>
          </span>
          <span 
            className="share-icon"
            onClick={() => handleShare(vehicle)}
          >
            <i className="fa-solid fa-share-nodes"></i>
          </span>
          <img src={vehicle.imageUrl} alt={vehicle.name} className="vehicle-image" />
          <div className="vehicle-info">
            <h4>{vehicle.name}</h4>
            <p>Model: {vehicle.model}</p>
            <p>Price: ₹{vehicle.price}</p>
            <button className="buy-button" onClick={() => handleBuy(vehicle.id)}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
  

  return (
    <div className="vehicle-list">
      <h2>Vehicle List</h2>
      
      <div className="search-container">
        <div className='btn'>
          <button className="reload-button" onClick={handleReload}>
            <i className="fa-solid fa-rotate-right"></i> Reload
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name or model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="sort-options">
        <button 
          className={sortOrder === 'lowToHigh' ? 'active' : ''} 
          onClick={() => setSortOrder('lowToHigh')}
        >
          Price: Low to High
        </button>
        <button 
          className={sortOrder === 'highToLow' ? 'active' : ''} 
          onClick={() => setSortOrder('highToLow')}
        >
          Price: High to Low
        </button>
      </div>

      <div className="section-buttons">
        <button 
          className={visibleSection === 'all' ? 'active' : ''} 
          onClick={() => setVisibleSection('all')}
        >
          All
        </button>
        <button 
          className={visibleSection === 'cars' ? 'active' : ''} 
          onClick={() => setVisibleSection('cars')}
        >
          Cars
        </button>
        <button 
          className={visibleSection === 'bikes' ? 'active' : ''} 
          onClick={() => setVisibleSection('bikes')}
        >
          Bikes
        </button>
        <button 
          className={visibleSection === 'cycles' ? 'active' : ''} 
          onClick={() => setVisibleSection('cycles')}
        >
          Cycles
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          {visibleSection === 'all' && renderVehicleGrid(sortedVehicles)}
          {visibleSection === 'cars' && renderVehicleGrid(cars)}
          {visibleSection === 'bikes' && renderVehicleGrid(bikes)}
          {visibleSection === 'cycles' && renderVehicleGrid(cycles)}
        </>
      )}
    </div>
  );
}

export default Fetch;
