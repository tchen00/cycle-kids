import React, {cloneElement, useState, useEffect} from "react";
import AppLayout from "../layouts/AppLayout";
import LandingLayout from "../layouts/LandingLayout";
import ReactPlayer from 'react-player'
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { auth, db } from '../config/firebase'
import { Link, useNavigate } from "react-router-dom";

const RoadAndCommunicationPage = () => {

  const [user, setUser] = useState(false)
  const [userName, setUserName] = useState("");

  useEffect(async () => {

    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(true)

        const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserName(doc.data().firstName + " " + doc.data().lastName);
        });

      } else {
        // User is not signed in.
      }
    });

    return unsub

  }, [])
  
  const [played, setPlayed] = useState(0);
  const [playedPercentage, setPercentage] = useState(0);
  function handlePause(){
    const timePlayed = played.toString()
    const percentagePlayed = (Math.round(playedPercentage*100)).toString()
    setDoc(doc(db, "RoadAndCommunication", auth.currentUser.uid), {
      type: 'RoadAndCommunication',
      email: auth.currentUser.email,
      userName: userName,
      timePlayed: timePlayed,
      percentagePlayed: percentagePlayed+'%',
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
            <ReactPlayer url='https://vimeo.com/652631281' controls={true} onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
          setPercentage(progress.played);
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

export default RoadAndCommunicationPage;