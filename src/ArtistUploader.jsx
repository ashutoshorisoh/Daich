import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';

const ArtistUploader = () => {
  const [jsonData, setJsonData] = useState('');

  const handleUpload = async () => {
    try {
      const parsedData = JSON.parse(jsonData);

      for (const artist of parsedData) {
        const artistRef = collection(db, 'artist');
        const q = query(artistRef, where('artist_name', '==', artist.artist_name)); // Use 'artist_name' here
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          await addDoc(artistRef, artist);
          console.log(`Artist '${artist.artist_name}' added successfully.`); // Updated to 'artist_name'
        } else {
          console.log(`Artist '${artist.artist_name}' already exists.`); // Updated to 'artist_name'
        }
      }
    } catch (error) {
      console.error('Error uploading artists:', error);
    }
  };

  return (
    <div className=''>
      <h2>Upload Artists</h2>
      <textarea
        rows="10"
        cols="50"
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder="Paste your JSON data here"
      ></textarea>
      <br />
      <button onClick={handleUpload} className=''>Upload</button>
    </div>
  );
};

export default ArtistUploader;
