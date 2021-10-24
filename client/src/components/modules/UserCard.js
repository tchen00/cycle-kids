import React, { Component } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./UserCard.css";


/**
 * UserCard is a component for displaying the userlist
 *
 * Proptypes
 * 
 * @param {string} email of the story
 * @param {string} access_code 
 */
class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      emai:"",
      access:"",

    }
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("i entered the usercard");
    //this.getUser();
    this.setState({
      emai:this.props.email,
      access:this.props.access_code,
  })
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    // console.log(this.state.tempvalue)
    console.log(this.props.type);
    
    if(this.props.type){
    this.props.deleteUser && this.props.deleteUser({email:this.state.emai});
    }
    else{
      this.props.deletenonUser && this.props.deletenonUser({email:this.state.emai});
    }
}
  render() {
    return (
    
        <> 
        <div className = "card-Container">
        <p className = "card-emailContainer">
            {"Email: "+this.state.emai}
          </p>
          <p className = "card-codeContainer"> 
            {" Access Code: "+this.state.access+" "}
          </p>
          <button 
            className = "card-buttonContainer"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
            >Delete
          </button>
        </div>  
        </>
      
    );
  }
}

export default UserCard;