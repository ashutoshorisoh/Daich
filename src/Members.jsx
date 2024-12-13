import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from 'members' collection
        const membersSnapshot = await getDocs(collection(db, 'members'));
        const membersData = membersSnapshot.docs.map((doc) => doc.data());

        // Update the state with the fetched data
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white flex flex-col h-screen w-screen">
      {/* Box-1 nav */}
      <Nav />

      {/* Box-2 members section */}
      <div className="h-[85%] w-full flex flex-col items-center justify-start p-10 gap-10">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Meet Our Members
        </h1>

        {/* Member grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {/* Loop over the members and display their photos and names */}
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-800 p-5 rounded-lg shadow-lg transition-all hover:shadow-2xl hover:bg-gray-700"
            >
              <img
                src={member.photoURL}
                alt={member.displayName}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-500"
              />
              <span className="text-xl font-semibold text-center text-white">{member.displayName}</span>
              <span className='text-sm'>{member.comments.length} Comments by user till now</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
