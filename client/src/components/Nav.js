import React, { Component } from "react";
import {Link} from "@reach/router";
import {get, post} from "../utilities.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "../utilities.css";
import "./Nav.css";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "506312647070-jov03v77clkk48riq1c2p9f6cbfnnqlb.apps.googleusercontent.com";

class Nav extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav className = "NavBar-container u-flex">
                    <section className="NavBar-linkContainer">
                    <Link to="/" className = "NavBar-link">HOME</Link>
                    <Link to="/teacher" className = "NavBar-link">FOR TEACHERS</Link>
                    {/* <Link to="/student" className = "NavBar-link">FOR STUDENT</Link> */}
                    <Link to="/manager" className = "NavBar-link">FOR MANAGER</Link>
                    </section>
                    <section className="NavBar-loginContainer">
                    {this.props.userId?(
                    <GoogleLogout
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={this.props.handleLogout}
                            onFailure={(err) => console.log(err)}
                            className="u-link NavBar-login"
                        />
                    ):(
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.props.handleLogin}
                            onFailure={(err) => console.log(err)}
                            className="u-link NavBar-login"
                        />
                    )}
                </section>
            </nav>
        ); 
    }
}
export default Nav;