import React, {Component} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
//import any components you might need

//Props
//Please list any variables you might need

class Activate extends Component {

    constructor(props){
        super(props);
        //initialize new props here
        this.state = {
            email:"",
            access:"",
        }

    }
    handleEmailChange = (event)=>{

        this.setState({
            email: event.target.value,
            
        })
    }
    handleAccessChange = (event)=>{
        this.setState({
            access: event.target.value,
            
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.email);
        get("/api/getnonUser", {email:this.state.email} ).then((nonUser)=>{
            console.log(nonUser);
            if(nonUser.access_code == this.state.access){

                post("/api/updateUser",{userId:this.props.userId,email:this.state.email, access_code:this.state.access});
                post("/api/deletenonUser",{email:this.state.email});
            }
        });

    }
    componentDidMount(){
        //this will run once 
    }
    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}> 
            <label> Email:
                <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
            </label>
            <label> Access Code:
                <input type="text" value={this.state.access} onChange={this.handleAccessChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>

            {/* <button
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
              >Submit
           </button> */}
            {/* <input
                type = "text"
                    placeholder=""
                    value={this.state.tempvalue}
                    onChange={this.handleChange}
                    />

            <button
                        type="submit"
                        value="Submit"
                        onClick={this.handleSubmit}
                >Save
            </button> */}
            </>
        )
    }
}
export default Activate;