import React, {cloneElement, useState, useEffect} from "react";
import AppLayout from "../layouts/AppLayout";
import LandingLayout from "../layouts/LandingLayout";
import ReactPlayer from 'react-player'
import { auth } from '../config/firebase'
import video1 from "../assets/video1thumbnail.jpeg"
import video2 from "../assets/video2thumbnail.jpeg"
import video3 from "../assets/video3thumbnail.jpeg"
import video4 from "../assets/video4thumbnail.jpeg"
import { Link, useNavigate } from "react-router-dom";

const VideosPage = () => {

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
    console.log(auth.currentUser.email, played)
  }

  // display based on user login 
  if (user) {
    return(
      <AppLayout>
        <div>


          <p>Helmet Fit</p>
          <Link to='/videos/helmet-fit'> 
            <img src={video1}/>
          </Link>

          <p>Bike ABCs</p>
          <Link to='/videos/bike-abcs'> 
            <img src={video2}/>
          </Link>

          <p>Gearing and Braking</p>
          <Link to='/videos/gearing-and-braking'> 
            <img src={video3}/>
          </Link>

          <p>Road and Communication</p>
          <Link to='/videos/road-and-communication'> 
            <img src={video4}/>
          </Link>
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

export default VideosPage;