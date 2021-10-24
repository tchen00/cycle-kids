import { getIterator } from "core-js";
import React, {Component} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import Activate from "../modules/Activate.js";
//import any components you might need

//Props
//Please list any variables you might need

class Teacher extends Component {

    constructor(props){
        super(props);
        //initialize new props here
        this.state = {
            usersauth:false,
            link:"",
        }

    }
    checkUser = () =>{
        get('/api/authUser',{userId:this.props.userId}).then((auth)=>{
            console.log(auth);
            if(auth){
                if(auth.email != "N/A"){
                    this.setState({
                    userauth:true
                    })
                }
            }
        })

    }
    //getLink = () =>
    componentDidMount(){
        //this will run once 
    }
    render(){
        let render = "Loading";
        if(this.props.userId && this.state.userauth){
            render = <iframe  width="840" height="690" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"></iframe>;
        }else if(this.props.userId && !(this.state.userauth)){
            this.checkUser();
            render =<Activate userId = {this.props.userId}/>;
        }
        else if(this.props.userId){
            render = <p>You are not allowed to view this content Please contact support</p>
        }
        else{
            render = "You are not authorized to view this content. Please log in.";
        }

        return(
            <div className = "teacherContainer" >
                {render}
            </div>
        )
    }
}
export default Teacher;