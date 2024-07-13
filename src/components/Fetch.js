import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // Import for animation
import './fetch.css';

function Fetch() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingIds, setLoadingIds] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [visibleSection, setVisibleSection] = useState('cars');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'));
        const vehiclesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching vehicles: ", error);
        setError('Failed to fetch vehicles. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoadingIds((prev) => [...prev, id]);
    try {
      await deleteDoc(doc(db, 'vehicles', id));
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      alert('Vehicle deleted successfully!');
    } catch (error) {
      console.error("Error deleting vehicle: ", error);
      alert('Error deleting vehicle.');
    } finally {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVehicles = filteredVehicles.sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const cars = sortedVehicles.filter(vehicle => vehicle.vehicleType === 'car');
  const bikes = sortedVehicles.filter(vehicle => vehicle.vehicleType === 'bike');
  const cycles = sortedVehicles.filter(vehicle => vehicle.vehicleType === 'cycle');

  const renderVehicleTable = (vehicles, title) => (
    <>
      <h3>{title}</h3>
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Price (INR)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td><strong>Name:</strong> {vehicle.name}</td>
              <td><strong>Model:</strong> {vehicle.model}</td>
              <td><strong>Price (INR):</strong> ₹{vehicle.price}</td>
              <td><img src={vehicle.imageUrl} alt={vehicle.name} /></td>
              <td className="action-container">
                {loadingIds.includes(vehicle.id) ? (
                  <span>Deleting...</span>
                ) : (
                  <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="vehicle-list">
      <h2>Vehicle List</h2>
      
      <input
        type="text"
        placeholder="Search by name or model"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
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
        <div className='slide-show'>
        <TransitionGroup>
          <CSSTransition
            key={visibleSection}
            timeout={500}
            classNames="slide"
          >
            <>
              {visibleSection === 'cars' && renderVehicleTable(cars, 'Cars')}
              {visibleSection === 'bikes' && renderVehicleTable(bikes, 'Bikes')}
              {visibleSection === 'cycles' && renderVehicleTable(cycles, 'Cycles')}
            </>
          </CSSTransition>
        </TransitionGroup>
        </div>
      )}
    </div>
  );
}

export default Fetch;
