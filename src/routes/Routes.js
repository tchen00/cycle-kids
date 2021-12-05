import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import VideosPage from '../pages/VideosPage'
import HelmetFitPage from '../pages/HelmetFitPage'
import BikeABCsPage from '../pages/BikeABCsPage'
import GearingAndBrakingPage from '../pages/GearingAndBrakingPage'
import RoadAndCommunicationPage from '../pages/RoadAndCommunicationPage'
import UsersPage from '../pages/UsersPage'
import PasswordResetPage from "../pages/PasswordResetPage";

const routes = () => {
	return (
    <Routes>
      <Route path="/videos" element={<VideosPage />}/>
      <Route path="/videos/helmet-fit" element={<HelmetFitPage />}/>
      <Route path="/videos/bike-abcs" element={<BikeABCsPage />}/>
      <Route path="/videos/gearing-and-braking" element={<GearingAndBrakingPage />}/>
      <Route path="/videos/road-and-communication" element={<RoadAndCommunicationPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/reset-password" element={<PasswordResetPage />}/>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/" element={<LoginPage />}/>
    </Routes>
  )
}

export default routes;