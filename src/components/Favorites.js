import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';  // Adjust the path based on your directory structure
import { auth } from './firebase'; // Ensure you import your auth instance
import './favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = auth.currentUser; // Get the current user

      if (currentUser) {
        const userId = currentUser.uid; // Get the authenticated user's ID

        try {
          const favoritesCollectionRef = collection(db, `users/${userId}/favorites`);
          const querySnapshot = await getDocs(favoritesCollectionRef);

          const fetchedFavorites = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setFavorites(fetchedFavorites);
        } catch (error) {
          console.error('Error fetching favorites from Firestore: ', error);
        }
      } else {
        console.log('User not logged in.');
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (vehicleId) => {
    const currentUser = auth.currentUser; // Get the current user

    if (currentUser) {
      const userId = currentUser.uid; // Get the authenticated user's ID

      try {
        const favoriteDocRef = doc(db, `users/${userId}/favorites/${vehicleId}`);
        await deleteDoc(favoriteDocRef); // Remove the favorite vehicle

        // Update local state
        setFavorites(favorites.filter(fav => fav.id !== vehicleId));
        console.log('Favorite removed successfully!');
      } catch (error) {
        console.error('Error removing favorite from Firestore: ', error);
      }
    } else {
      console.log('User not logged in. Cannot remove favorite.');
    }
  };

  const renderFavorites = () => (
    <div id='vehicle' className="vehicle-grid">
      {favorites.length > 0 ? (
        favorites.map(vehicle => (
          <div className="vehicle-box" key={vehicle.id}>
            <img src={vehicle.imageUrl} alt={vehicle.name} className="vehicle-image" />
            <div className="vehicle-info">
              <h4>{vehicle.name}</h4>
              <p>Model: {vehicle.model}</p>
              <p>Price: ₹{vehicle.price}</p>
              <button onClick={() => handleRemoveFavorite(vehicle.id)}>Remove from Favorites</button>
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
