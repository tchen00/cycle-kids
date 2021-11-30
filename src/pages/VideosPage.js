import React, {cloneElement, useState} from "react";
import AppLayout from "../layouts/AppLayout";
import ReactPlayer from 'react-player'
import { getAuth } from "firebase/auth";

const VideosPage = () => {

  //get user 
  const auth = getAuth();
  const user = auth.currentUser;

  
  const [played, setPlayed] = useState(0);
  function handlePause(){
    console.log(user.email, played)
  }

  // display based on user login 
  if (user) {
    return(
      <AppLayout>
          <ReactPlayer url='https://vimeo.com/488687239' controls={true} onProgress={(progress) => {
         setPlayed(progress.playedSeconds);
       }} onPause={handlePause}
     />
          
      </AppLayout>
    )
  } else {
    // No user is signed in.
    return(
      <AppLayout>
        You are not authorized to see this 
      </AppLayout>
    )
  }


  
}

export default VideosPage;