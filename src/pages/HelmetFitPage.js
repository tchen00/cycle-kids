import React, {cloneElement, useState, useEffect} from "react";
import AppLayout from "../layouts/AppLayout";
import LandingLayout from "../layouts/LandingLayout";
import ReactPlayer from 'react-player'
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from '../config/firebase'
import { Link, useNavigate } from "react-router-dom";

const HelmetFitPage = () => {

  const [user, setUser] = useState(false)

  useEffect(async () => {

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true)
      } else {
        // User is not signed in.
      }
    });

    return unsub

  }, [])
  
  const [played, setPlayed] = useState(0);
  function handlePause(){
    const timePlayed = played.toString()
   
    setDoc(doc(db, "HelmitFit", auth.currentUser.uid), {
      type: 'HelmitFit',
      email: auth.currentUser.email,
      timePlayed: timePlayed,
    }).then(() => {
      console.log('time recorded')
    }
    )
  }

  // display based on user login 
  if (user) {
    return(
      <AppLayout>
        <div className="px-8 py-8">
          <Link to='/videos'>
            <p className="pb-4 hover:underline">Return to Main</p>
          </Link>
            <ReactPlayer url='https://vimeo.com/652625878' controls={true} onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
        }} onPause={handlePause}
      />
        </div>
      </AppLayout>
    )
  } else {
    // No user is signed in.
    return(
      <LandingLayout>
        {/* <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="text-center">
                <h1 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">Sorry, you're not authorized to view this page.</h1>
              </div>
            </div>
          </main>
        </div> */}
      </LandingLayout>
    )
  }

  
}

export default HelmetFitPage;