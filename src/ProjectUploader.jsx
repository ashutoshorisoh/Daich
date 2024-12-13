import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';

const ProjectUploader = () => {
  const [jsonData, setJsonData] = useState('');

  const handleUpload = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
  
      for (const project of parsedData) {
        // Check if required fields are present
        if (!project['project name'] || !project['artist name']) {
          console.error('Missing required fields:', project);
          continue; // Skip this project if required fields are missing
        }
  
        const projectRef = collection(db, 'project');
        const q = query(projectRef, where('project name', '==', project['project name']));
        const snapshot = await getDocs(q);
  
        if (snapshot.empty) {
          await addDoc(projectRef, project);
          console.log(`Project '${project['project name']}' added successfully.`);
        } else {
          console.log(`Project '${project['project name']}' already exists.`);
        }
      }
    } catch (error) {
      console.error('Error uploading projects:', error);
    }
  };
  

  return (
    <div>
    <h2>Upload Projects</h2>
    <textarea
      rows="10"
      cols="50"
      value={jsonData}
      onChange={(e) => setJsonData(e.target.value)}
      placeholder="Paste your JSON data here"
    ></textarea>
    <br />
    <button onClick={handleUpload}>Upload</button>
  </div>
);
};

export default ProjectUploader;