import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Feed from './Feed.jsx';
import ArtistUploader from './ArtistUploader.jsx';
import ProjectUploader from './ProjectUploader.jsx';
import Members from './Members.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { UserProvider } from './Context/UserContext.jsx';
import TrackThread from './TrackThread.jsx';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/artist-uploader" element={<ArtistUploader />} />
            <Route path="/project-uploader" element={<ProjectUploader />} />
            <Route path="/members" element={<Members />} />
            <Route path="/track/:id" element={<TrackThread />} />

          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
