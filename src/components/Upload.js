import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase'; // Import db from your firebase.js file
import { collection, addDoc } from 'firebase/firestore';
import './upload.css';

function Upload() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [vehicleType, setVehicleType] = useState('car'); // State for vehicle type
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `vehicles/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(collection(db, "vehicles"), {
        name,
        model,
        price,
        vehicleType, // Add vehicle type to the document
        imageUrl: downloadURL,
      });

      console.log("Document written with ID: ", docRef.id);
      setName('');
      setModel('');
      setPrice('');
      setImage(null);
      setVehicleType('car'); // Reset vehicle type
      setUploading(false);
      alert('Vehicle data uploaded successfully!');
    } catch (error) {
      console.error("Error uploading document: ", error);
      setUploading(false);
      alert('Error uploading vehicle data.');
    }
  };

  return (
    <div className='vehicle-page'>
      <div className="vehicle-form">
        <h2>Upload Vehicle Data</h2>
        <form onSubmit={handleSubmit}>
          <div className='head'>
            <label>Name:</label>
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='head'>
            <label>Model:</label>
            <input type="text" placeholder='Model' value={model} onChange={(e) => setModel(e.target.value)} required />
          </div>
          <div className='head'>
            <label>Price:</label>
            <input type="text" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className='head'>
            <label>Type:</label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
              <option value="select Option"></option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="cycle">Cycle</option>
            </select>
          </div>
          <div className='head'>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} required />
          </div>
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
