import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';  // Adjust the path based on your directory structure

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = 'exampleUserId'; // Replace with actual user ID from authentication
  
      try {
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching favorites from Firestore: ', error);
      }
    };
  
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (vehicleId) => {
    const userId = 'exampleUserId'; // Replace with actual user ID from authentication
  
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== vehicleId);
      setFavorites(updatedFavorites);
  
      const userDocRef = doc(db, 'users', userId);
      const vehicleToRemove = favorites.find(fav => fav.id === vehicleId);

      if (vehicleToRemove) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(vehicleToRemove) // Remove the exact vehicle object
        });
        console.log('Favorite removed successfully!');
      } else {
        console.log('Vehicle not found in favorites');
      }
    } catch (error) {
      console.error('Error removing favorite from Firestore: ', error);
    }
  };

  const renderFavorites = () => (
    <div className="vehicle-grid">
      {favorites.length > 0 ? (
        favorites.map(vehicle => (
          <div className="vehicle-box" key={vehicle.id}>
            <img src={vehicle.imageUrl} alt={vehicle.name} className="vehicle-image" />
            <div className="vehicle-info">
              <h4>{vehicle.name}</h4>
              <p>Model: {vehicle.model}</p>
              <p>Price: ₹{vehicle.price}</p>
              <button className='' onClick={() => handleRemoveFavorite(vehicle.id)}>Remove from Favorites</button>
            </div>
          </div>
        ))
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );  

  return (
    <div className="favorites-list">
      <h2>Your Favorites</h2>
      {renderFavorites()}
    </div>
  );
}

export default Favorites;
