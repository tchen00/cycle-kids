import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Teacher from "./pages/Teacher.js";
import Student from "./pages/Student.js";
import Manager from "./pages/Manager.js";
import Nav from "./Nav.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      //post("/api/initsocket", { socketid: socket.id });
      this.handleTimeIn(user._id);
    });
  };
  
  handleLogout = () => {
    
    this.setState({ userId: undefined });
    post("/api/logout");
    
  };

  //my own functions 
  //not yet working 
  handleTimeIn = (userId)=>{
    console.log("times is updated");
    console.log(Date.now());
    post("/api/timelogin",{"userId":userId,"logIn":Date.now()}).then((returnObj)=>{
      console.log("finished");
    })
  }
  handleTimeOut = ()=>{
    console.log("times is updated");
    console.log(Date.now());
    post("/api/timelogout",{"userId":this.state.userId,"logOut":Date.now()}).then((returnObj)=>{
      console.log("finished");
      this.handleLogout()
    })
  } 
  render() {
    return (
      <>
        <Nav userId={this.state.userId} 
            handleLogin={this.handleLogin}
            handleLogout={this.handleTimeOut}
        />
        <Router>
          <Skeleton path="/" userId={this.state.userId} />
          
          <Teacher path="/teacher" userId={this.state.userId}/>
          <Student path="/student" userId= {this.state.userId}/>
          <Manager path="/manager" userId= {this.state.userId}/>
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
