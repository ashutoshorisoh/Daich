import React, { useEffect } from 'react';
import { db } from '../firebase.config'; // Assuming you've already set up Firebase
import { collection, addDoc } from 'firebase/firestore'; // Import the `addDoc` function
import { Search } from 'lucide-react';

function Home() {
  const artistData = [
    {
      "artist name": "Divine",
      "img": "https://i.scdn.co/image/ab6761610000e5ebe4bae1cd1803402a906b61ba"
    },
    {
      "artist name": "Raga",
      "img": "https://i.scdn.co/image/ab6761610000e5eb6ba6d9b1ef68c76fe0f62ee4"
    },
    {
      "artist name": "encore abj",
      "img": "https://i.scdn.co/image/ab67616d0000b273467067c33372781fdeacfb8c"
    },
    {
      "artist name": "Sikander Kahlon",
      "img": "https://i.scdn.co/image/ab67616d0000b2730586e91b54549d521865ae7b"
    },
    {
      "artist name": "MK The Cynic",
      "img": "https://i.scdn.co/image/ab6761610000e5eb20834290de834433b4ed87df"
    },
    {
      "artist name": "Shanu",
      "img": "https://i.scdn.co/image/ab6761610000e5ebb8e46ad8e7011330a23866fb"
    },
    {
      "artist name": "Pasha Bhai",
      "img": "https://i.scdn.co/image/ab6761610000e5eb99ffeafd293f7758922f38ae"
    },
    {
      "artist name": "Gud Kid",
      "img": "https://i.scdn.co/image/ab6761610000e5eb909708a4f1fee376be6ac355"
    },
    {
      "artist name": "Vijay DK",
      "img": "https://i.scdn.co/image/ab6761610000e5ebb0a8548bf30d9fd80eba22dc"
    },
    {
      "artist name": "Shreyas Sagvekar",
      "img": "https://i.scdn.co/image/ab6761610000e5eb039ebe9ccca0a6da5853127b"
    },
    {
      "artist name": "Harass",
      "img": "https://i.scdn.co/image/ab6761610000e5ebef588ea6402e02deaccd756d"
    },
    {
      "artist name": "Bagi Munda",
      "img": "https://i.scdn.co/image/ab6761610000e5eb7dd3b21c164683134f82f067"
    },
    {
      "artist name": "Bboyblanck",
      "img": "https://i.scdn.co/image/ab6761610000e5ebe2f7673a0174422e188bcc28"
    },
    {
      "artist name": "Dhanji",
      "img": "https://i.scdn.co/image/ab6761610000e5eb6cd974e694ff7752b42f3ad3"
    }
  ];
  

  const projectData = [
    {
      "project name": "Street Dreams",
      "artist name": "Divine",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273be6eefb59eac2f121e87c99f",
      "rating": 5,
      "comments": "Amazing album!"
    },
    {
      "project name": "Rap ka Mausam",
      "artist name": "Raga",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273a04a38fde3714da32efcd24b",
      "rating": 4,
      "comments": "Great project!"
    },
    {
      "project name": "Ruswai",
      "artist name": "encore abj",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273467067c33372781fdeacfb8c",
      "rating": 4.5,
      "comments": "Very unique sound!"
    },
    {
      "project name": "Colonial Mindset",
      "artist name": "Sikander Kahlon",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b2736eb67a2afce7fb6fc226747f",
      "rating": 4.8,
      "comments": "A raw reflection of society."
    },
    {
      "project name": "On My Mind",
      "artist name": "MK The Cynic",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b27334c934d1f90e2cf0a37cae3a",
      "rating": 4,
      "comments": "A brilliant blend of modern and classic."
    },
    {
      "project name": "Faasle",
      "artist name": "Shanu",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b2735b0cb173de2400a379195743",
      "rating": 4.2,
      "comments": "Thought-provoking lyrics with a catchy beat."
    },
    {
      "project name": "Bangalore ka Potta",
      "artist name": "Pasha Bhai",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b27309649a7ba49b70898fd5f112",
      "rating": 4.3,
      "comments": "An anthem for the streets of Bangalore."
    },
    {
      "project name": "Schizo",
      "artist name": "Gud Kid",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273a42ee0b125004e3e9c0584e7",
      "rating": 4.7,
      "comments": "A deep dive into the mind of the artist."
    },
    {
      "project name": "4Three4Life",
      "artist name": "Vijay DK",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273e3ada65f23561150fabb2152",
      "rating": 4.6,
      "comments": "Catchy, energetic, and meaningful."
    },
    {
      "project name": "Stop Bulshittin the Fans Vol 1",
      "artist name": "Shreyas Sagvekar",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b2731a97c8a38d5bfbd417122fb2",
      "rating": 4.4,
      "comments": "A witty and refreshing take on hip-hop."
    },
    {
      "project name": "RUAB (Director's Cut)",
      "artist name": "Harass",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273df0b36e230685ffc05a2c9e6",
      "rating": 4.9,
      "comments": "A masterpiece in every sense."
    },
    {
      "project name": "Player No 1",
      "artist name": "Bagi Munda",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b2737ee72ee695df8ac3de3f8da7",
      "rating": 4.5,
      "comments": "A thrilling ride from start to finish."
    },
    {
      "project name": "Surveillance of Angels",
      "artist name": "Bboyblanck",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273e04f813cdb00beff60b95c34",
      "rating": 4.8,
      "comments": "A captivating fusion of beats and rhymes."
    },
    {
      "project name": "RUAB (Director's Cut)",
      "artist name": "Dhanji",
      "project cover art": "https://i.scdn.co/image/ab67616d0000b273df0b36e230685ffc05a2c9e6",
      "rating": 4.7,
      "comments": "A deep and introspective album."
    }
  ];
  

  // Function to insert artist data into the Firebase database
  const insertArtistData = async () => {
    try {
      const artistCollectionRef = collection(db, 'artists');
      for (let artist of artistData) {
        await addDoc(artistCollectionRef, {
          artistName: artist["artist name"],
          artistImage: artist.img
        });
      }
    } catch (error) {
      console.error("Error inserting artist data:", error);
    }
  };

  // Function to insert project data into the Firebase database
  const insertProjectData = async () => {
    try {
      const projectCollectionRef = collection(db, 'projects');
      for (let project of projectData) {
        await addDoc(projectCollectionRef, {
          projectName: project["project name"],
          artistName: project["artist name"],
          projectCoverArt: project["project cover art"],
          rating: project.rating,
          comments: project.comments
        });
      }
    } catch (error) {
      console.error("Error inserting project data:", error);
    }
  };

  // Run both functions on component mount
  useEffect(() => {
    insertArtistData();
    insertProjectData();
  }, []);

  return (
    <div className='bg-black text-white flex flex-col  h-screen w-screen'>
      {/* box-1 nav*/}
      <div className=' w-full h-[15%]  flex justify-end gap-10 pr-10 text-2xl items-center'>
        <div className='flex '>
         <input type="text" className=' rounded-l-full pt-2 pb-2' />
         <button className='bg-white text-black rounded-r-full pr-6 pt-2 pb-2 '><Search/> </button>
        </div>
        
        <button>MEMBERS</button>
        <button>LISTS</button>
        <button>SIGN UP</button>
        <button>LOGIN</button>

      </div>

      {/* box-2 3 row one*/}

      <div className='h-[85%] w-full flex items-center justify-between flex-row'>

        {/* box-2 row 1 */}
        <div className='w-[20%] ml-5 h-full flex justify-center items-center flex-col gap-5'>
          
            <div className='h-[24%] overflow-hidden'>
              <img src={artistData[1].img} alt="" className='h-full opacity-70 w-full object-contain' />
            </div>

            <div className='h-[33%] overflow-hidden'>
              <img src={artistData[6].img} alt="" className='h-full w-full opacity-100 object-contain' />
            </div>

            <div className='h-[24%] overflow-hidden'>
              <img src={artistData[5].img} alt="" className='h-full w-full opacity-70 object-contain' />
            </div>
            
        </div>
        
        {/* box-2 row 2 */}
        <div className='w-[60%] h-full flex flex-col justify-center items-start '>
           <h1 className='text-6xl flex font-bold flex-wrap'>Join the Circle—Where DHH Fans and Flows Connect</h1>
           <button className='text-5xl bg-red-800 pl-10 pr-10 pt-3 pb-3 font-semibold mt-5 rounded-full'> Join Now</button>
        </div>

        {/*box-2 row 3*/}
        <div className='w-[20%] ml-5 pt-2 pb-2 h-full flex justify-center items-center flex-col gap-5'>
           <div className='h-[10%] overflow-hidden'>
              <img src={projectData[4]['project cover art']} alt="" className='h-full opacity-20 w-full object-contain' />
            </div>
            <div className='h-[20%] overflow-hidden'>
              <img src={projectData[1]['project cover art']} alt="" className='h-full w-full opacity-40 object-contain' />
            </div>

            <div className='h-[33%] overflow-hidden'>
              <img src={projectData[11]['project cover art']} alt="" className='h-full w-full opacity-100 object-contain' />
            </div>

            <div className='h-[20%] overflow-hidden'>
              <img src={projectData[8]['project cover art']} alt="" className='h-full w-full opacity-40 object-contain' />
            </div>
            <div className='h-[10%] overflow-hidden'>
              <img src={projectData[3]['project cover art']} alt="" className='h-full w-full opacity-20 object-contain' />
            </div>
            
        </div>




      </div>


    </div>
  );
}

export default Home;
