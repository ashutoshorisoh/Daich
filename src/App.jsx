import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Example function to navigate to '/home'
  const goToHome = () => {
    navigate('/home');
  }

  return (
    <div>
      {/* Button for navigation */}
      <button onClick={goToHome}>Go to Home</button>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div>Welcome to the App! <button onClick={goToHome}>Go to Home</button></div>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
