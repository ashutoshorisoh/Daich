// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'members', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else {
      setUserData(null); // Clear user data if not logged in
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, user }}>
      {children}
    </UserContext.Provider>
  );
};
