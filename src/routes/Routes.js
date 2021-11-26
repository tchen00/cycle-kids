import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import VideosPage from '../pages/VideosPage'

const routes = () => {
	return (
    <Switch>
      <Route path="/videos" component={VideosPage}/>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/" component={LoginPage}/>
    </Switch>
  )
}

export default routes;