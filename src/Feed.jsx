import React, { useEffect, useState, useContext } from 'react';
import Nav from './Nav';
import { db } from '../firebase.config';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { AuthContext } from './Context/AuthContext';
import { UserContext } from './Context/UserContext';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const [artist, setArtist] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user and auth context
  const { currentUser } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from two collections concurrently
        const [collection1Snapshot, collection2Snapshot] = await Promise.all([
          getDocs(collection(db, 'artist')),
          getDocs(collection(db, 'project')),
        ]);

        // Map the data from both collections
        const data1 = collection1Snapshot.docs.map((doc) => doc.data());
        const data2 = collection2Snapshot.docs.map((doc) => doc.data());

        // Update the state with the fetched data
        setArtist(data1);
        setProjects(data2);

        // Listen to real-time updates from the projects collection
        const unsubscribe = onSnapshot(collection(db, 'project'), (querySnapshot) => {
          const projectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(projectsData); // Set the fetched data to state
        });

        // Cleanup the listener when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
   // Empty dependency array ensures the effect runs only once

  if (loading) return <div>Loading...</div>;
  const handleBoxClick = (projectId) => {
    navigate(`/project/${projects.id}`);  // Redirect to project details page
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-950">★</span>); // Filled star
      } else {
        stars.push(<span key={i} className="text-gray-400">★</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className='bg-black text-white flex flex-col h-screen w-screen  p-2'>
      <Nav />

      <div className='h-[40%] w-full flex flex-row justify-center items-center gap-2'>
        <div className='h-[40%] w-auto overflow-hidden bg-green-300 pb-6 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm cursor-pointer' onClick={handleBoxClick}>
          <img src={projects[12]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-md items-center'>{renderStars(projects[3]?.rating)}</p>
        </div>
        <div className='h-[50%] w-auto overflow-hidden bg-blue-300 pb-7 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm'>
          <img src={projects[3]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-lg items-center'>{renderStars(projects[3]?.rating)}</p>

        </div>
        <div className='h-[60%] w-auto overflow-hidden bg-green-300 pb-8 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm'>
          <img src={projects[1]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-xl items-center'>{renderStars(projects[1]?.rating)}</p>

        </div>
        <div className='h-[70%] w-auto overflow-hidden bg-blue-600 pb-9 pl-2 pr-2 pt-2 rounded-xl shadow-blue-100 shadow-sm'>
          <img src={projects[0]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-2xl items-center'>{renderStars(projects[0]?.rating)}</p>

        </div>
        <div className='h-[80%] w-auto overflow-hidden bg-green-600 pb-10 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm'>
          <img src={projects[5]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-3xl items-center'>{renderStars(projects[5]?.rating)}</p>

        </div>
        <div className='h-[100%] w-auto overflow-hidden bg-yellow-300 pb-12 pl-2 pr-2 pt-2 rounded-xl shadow-yellow-100 shadow-sm'>
          <img src={projects[11]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-4xl items-center'>{renderStars(projects[11]?.rating)}</p>

        </div>

        <div className='h-[80%] w-auto overflow-hidden bg-red-600 pb-10 pl-2 pr-2 pt-2 rounded-xl shadow-red-100 shadow-sm'>
          <img src={projects[7]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-3xl items-center'>{renderStars(projects[7]?.rating)}</p>

        </div>
        <div className='h-[70%] w-auto overflow-hidden bg-pink-600 pb-9 pl-2 pr-2 pt-2 rounded-xl shadow-pink-100 shadow-sm'>
          <img src={projects[10]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-2xl items-center'>{renderStars(projects[10]?.rating)}</p>

        </div>
        <div className='h-[60%] w-auto overflow-hidden bg-green-300 pb-8 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm'>
          <img src={projects[2]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-xl items-center'>{renderStars(projects[2]?.rating)}</p>

        </div>
        <div className='h-[50%] w-auto overflow-hidden bg-blue-300 pb-7 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm'>
          <img src={projects[6]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-lg items-center'>{renderStars(projects[6]?.rating)}</p>

        </div>
        <div className='h-[40%] w-auto overflow-hidden bg-green-300 pb-6 pl-2 pr-2 pt-2 rounded-xl shadow-green-100 shadow-sm'>
          <img src={projects[10]?.['project cover art']} alt='' className='h-full w-full object-contain' />
          <p className=' flex justify-center text-sm items-center'>{renderStars(projects[10]?.rating)}</p>

        </div>
      </div>

      <div className='h-[50%] w-full flex flex-row gap-2'>
        <div className='h-[90%] w-[30%] bg-blue-100 ml-10 mb-10 rounded-r-3xl flex flex-row justify-between items-center mt-5'>
          <div className='h-full w-full flex flex-row justify-start items-center overflow-hidden'>
            {/* Image Section */}
            <div className='h-full w-[40%] overflow-hidden'>
              <img
                src={projects[4]?.['project cover art']}
                alt='Project Cover Art'
                className='h-full w-full object-cover shadow-black shadow-xl'
              />
            </div>

            {/* Text and Info Section */}
            <div className='flex flex-col justify-start items-start p-8 w-[60%]'>
              <h1 className='text-4xl text-black font-bold mb-4'>{projects[4]?.['project name']}</h1>
              <h2 className='text-sm text-gray-700 font-semibold mb-2'>
                Artist: <span className='text-blue-800'>{projects[4]?.['artist name']}</span>
              </h2>
              <h2 className='text-sm text-gray-700 font-semibold mb-2'>
                Rating: <span className='text-red-800'>{projects[4]?.rating}</span>/5
              </h2>
              <h2 className='text-sm text-gray-700 font-semibold mb-4'>
                Latest Comment:
                <p className='text-green-800 mt-1'>{projects[4]?.comments}</p>
              </h2>
              <button className='bg-blue-800 font-semibold text-white w-full mt-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition'>
                Share Your Thoughts
              </button>
            </div>
          </div>
        </div>

        {/* Repeat this structure for other project cards */}
        <div className='h-[90%] w-[30%] bg-blue-100 ml-10 mb-10 rounded-r-3xl flex flex-row justify-between items-center mt-5'>
          <div className='h-full w-full flex flex-row justify-start items-center overflow-hidden'>
            {/* Image Section */}
            <div className='h-full w-[40%] overflow-hidden'>
              <img
                src={projects[8]?.['project cover art']}
                alt='Project Cover Art'
                className='h-full w-full object-cover shadow-black shadow-xl'
              />
            </div>

            {/* Text and Info Section */}
            <div className='flex flex-col justify-start items-start p-8 w-[60%]'>
              <h1 className='text-4xl text-black font-bold mb-4'>{projects[8]?.['project name']}</h1>
              <h2 className='text-sm text-gray-700 font-semibold mb-2'>
                Artist: <span className='text-blue-800'>{projects[8]?.['artist name']}</span>
              </h2>
              <h2 className='text-sm text-gray-700 font-semibold mb-2'>
                Rating: <span className='text-red-800'>{projects[8]?.rating}</span>/5
              </h2>
              <h2 className='text-sm text-gray-700 font-semibold mb-4'>
                Latest Comment:
                <p className='text-green-800 mt-1'>{projects[8]?.comments}</p>
              </h2>
              <button className='bg-blue-800 font-semibold text-white w-full mt-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition'>
                Share Your Thoughts
              </button>
            </div>
          </div>
        </div>

        <div className='h-[90%] w-[30%] bg-blue-100 ml-10 mb-10 rounded-r-3xl flex flex-row justify-between items-center mt-5'>
          <div className='h-full w-full flex flex-row justify-start items-center overflow-hidden'>
            {/* Image Section */}
            <div className='h-full w-[40%] overflow-hidden'>
              <img
                src={projects[8]?.['project cover art']}
                alt='Project Cover Art'
                className='h-full w-full object-cover shadow-black shadow-xl'
              />
            </div>

            {/* Text and Info Section */}
            <div className='flex flex-col justify-start items-start p-8 w-[60%]'>
              <h1 className='text-4xl text-black font-bold mb-4'>{projects[8]?.['project name']}</h1>
              <h2 className='text-sm text-gray-700 font-semibold mb-2'>
                Artist: <span className='text-blue-800'>{projects[8]?.['artist name']}</span>
              </h2>
              <h2 className='text-sm text-gray-700 font-semibold mb-2'>
                Rating: <span className='text-red-800'>{projects[8]?.rating}</span>/5
              </h2>
              <h2 className='text-sm text-gray-700 font-semibold mb-4'>
                Latest Comment:
                <p className='text-green-800 mt-1'>{projects[8]?.comments}</p>
              </h2>
              <button className='bg-blue-800 font-semibold text-white w-full mt-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition'>
                Share Your Thoughts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
