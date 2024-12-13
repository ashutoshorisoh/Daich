import React, { useEffect, useState, useContext } from 'react';
import { auth, db } from '../firebase.config';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Nav from './Nav';
import { AuthContext } from './Context/AuthContext';  // Import AuthContext
import { UserContext } from './Context/UserContext';  // Import UserContext

function Home() {
  const { authUser, setAuthUser } = useContext(AuthContext); // Access AuthContext
  const { user, setUser } = useContext(UserContext); // Access UserContext
  const [artist, setArtist] = useState();
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching artist and project data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collection1Snapshot, collection2Snapshot] = await Promise.all([
          getDocs(collection(db, 'artist')),
          getDocs(collection(db, 'project')),
        ]);
        const data1 = collection1Snapshot.docs.map((doc) => doc.data());
        const data2 = collection2Snapshot.docs.map((doc) => doc.data());

        setArtist(data1);
        setProjects(data2);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handling Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Setting user data in the state
      setUser(user);
      setAuthUser(user);

      // Storing user data in Firestore
      await setDoc(doc(db, 'members', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        comments: []
      }, { merge: true });

      // Close modal after successful sign-in
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Open modal
  const openModal = () => setIsModalOpen(true);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white flex flex-col h-screen w-screen">
      {/* Box-1 nav */}
      <Nav />

      {/* Box-2 3 row one */}
      <div className="h-[85%] w-full flex items-center justify-between flex-row">
        {/* Box-2 row 1 */}
        <div className="w-[20%] ml-5 h-full flex justify-center items-center flex-col gap-5">
          <div className="h-[24%] overflow-hidden">
            <img src={artist[1].img} alt="" className="h-full opacity-70 w-full object-contain" />
          </div>

          <div className="h-[33%] overflow-hidden">
            <img src={artist[6].img} alt="" className="h-full w-full opacity-100 object-contain" />
          </div>

          <div className="h-[24%] overflow-hidden">
            <img src={artist[5].img} alt="" className="h-full w-full opacity-70 object-contain" />
          </div>
        </div>

        {/* Box-2 row 2 */}
        <div className="w-[60%] h-full flex flex-col justify-center items-start ">
          <h1 className="text-6xl flex font-bold flex-wrap">
            Join the Circle—Where DHH Fans and Flows Connect
          </h1>
          <button
            onClick={openModal}
            className="text-5xl bg-red-800 pl-10 pr-10 pt-3 pb-3 font-semibold mt-5 rounded-full"
          >
            Join Now
          </button>
        </div>

        {/* Box-2 row 3 */}
        <div className="w-[20%] ml-5 pt-2 pb-2 h-full flex justify-center items-center flex-col gap-5">
          <div className="h-[10%] overflow-hidden">
            <img src={projects[4]['project cover art']} alt="" className="h-full opacity-20 w-full object-contain" />
          </div>
          <div className="h-[20%] overflow-hidden">
            <img src={projects[1]['project cover art']} alt="" className="h-full w-full opacity-40 object-contain" />
          </div>

          <div className="h-[33%] overflow-hidden">
            <img src={projects[11]['project cover art']} alt="" className="h-full w-full opacity-100 object-contain" />
          </div>

          <div className="h-[20%] overflow-hidden">
            <img src={projects[8]['project cover art']} alt="" className="h-full w-full opacity-40 object-contain" />
          </div>
          <div className="h-[10%] overflow-hidden">
            <img src={projects[3]['project cover art']} alt="" className="h-full w-full opacity-20 object-contain" />
          </div>
        </div>
      </div>

      {/* Modal for Login */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-1/3">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold"
            >
              Sign in with Google
            </button>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={closeModal}
                className="text-white bg-red-800 py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
