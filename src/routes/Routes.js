import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import VideosPage from '../pages/VideosPage'

const routes = () => {
	return (
    <Routes>
      <Route path="/videos" element={<VideosPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/" element={<LoginPage />}/>
    </Routes>
  )
}

export default routes;