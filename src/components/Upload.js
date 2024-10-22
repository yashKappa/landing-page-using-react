import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import './upload.css';

function Upload() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [vehicleType, setVehicleType] = useState('car');
  const [uploading, setUploading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB.');
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    if (!name || !model || !price || !image || !vehicleType) {
      alert('All fields are required, including an image.');
      setUploading(false);
      return;
    }

    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
        console.log("Signed in anonymously");
      } catch (error) {
        console.error("Error signing in:", error);
        alert("You must be logged in to upload vehicle data.");
        setUploading(false);
        return;
      }
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `vehicles/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(collection(db, "vehicles"), {
        name,
        model,
        price,
        vehicleType,
        imageUrl: downloadURL,
      });

      console.log("Document written with ID: ", docRef.id);
      alert('Vehicle data uploaded successfully!');

      // Reset form fields
      setName('');
      setModel('');
      setPrice('');
      setImage(null);
      setVehicleType('car');
      setUploading(false);
    } catch (error) {
      console.error("Error uploading document: ", error.message);
      console.error("Error details: ", error);
      setUploading(false);
      alert('Error uploading vehicle data. Check console for details.');
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
              <option value="">Select Option</option>
              <option value="car">Car</option>
              <option value="sports_car">Sports Car</option>
              <option value="bike">Bike</option>
              <option value="sports_bike">Sports Bike</option>
              <option value="cycle">Cycle</option>
              <option value="sports_cycle">Sports Cycle</option>
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
