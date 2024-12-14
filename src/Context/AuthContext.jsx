// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken= async ()=>{
      try{
        const response = await fetch('https://dhhbackend.onrender.com/spotify-token')
        if(!response.ok){
          throw new Error ('failed to fetch')
        }else{
          const data = await response.json();
          setToken(data.accessToken)
        }
      }
      catch(error){
          console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    
   fetchToken()
  }, []);

  return (
    <AuthContext.Provider value={{ token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
