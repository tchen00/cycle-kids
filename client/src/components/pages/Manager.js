import React, {Component} from "react";
import user from "../../../../server/models/user";
import { get, post } from "../../utilities";
import UserCard from "../modules/UserCard.js";
import "../../utilities.css";
import "./Manager.css";
//import any components you might need

//Props
/**
 * @param {Object} UserList
 * 
 */

class Manager extends Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            nonusers:[],
            newUser:"",
            access_code:"",
            role:"",
        }

    }
    getUser = ()=>{
        get("/api/getUsers").then((userDat)=>{
            // console.log(userDat);
            
            this.setState({
                users: this.state.users.concat(userDat),
            })
        })
        get("/api/getnonUsers").then((nonuserDat)=>{
            //console.log(nonuserDat);
            this.setState({
                nonusers: this.state.nonusers.concat(nonuserDat),
            })
        })

    }
    addUser = (newUser)=>{
        //console.log(newUser);
        post("/api/addUser",newUser).then((newUserDat)=>{
            //console.log("New user")
            //console.log(newUserDat);
            this.setState({
                nonusers: this.state.nonusers.concat(newUserDat),
            })
        })
    }
    deleteUser = (email)=>{
        console.log("deleted ");
        console.log(email);
        post("/api/deleteUser",email).then((deletedUser)=>{
            console.log(deletedUser);
            this.setState({
                users: this.state.users.filter((user)=>{user.email!=email.email})
            });

        })
        
    }
    deletenonUser = (email)=>{
        console.log("deleted ");
        console.log(email);
        post("/api/deletenonUser",email).then((randomUser)=>{
            console.log(randomUser);
            this.setState({
                nonusers: this.state.nonusers.filter((nonuser)=>{nonuser.email != email.email}
            )});
        })
    }
    handleChange = (event)=>{

        this.setState({
            newUser: event.target.value,
            
        })
    }
    checkUser = () =>{
        get('/api/authUser',{userId:this.props.userId}).then((auth)=>{
            console.log(auth);
            if(auth){
                    this.setState({
                    role:auth.role
                    })
            }
        })

    }
    handleSubmit = (event)=>{
        event.preventDefault();
        // console.log(this.state.tempvalue)
        //console.log(this.state.newUser);
        //console.log(this.state.access_code);
        console.log("i made a new access_code ")
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 16; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        console.log(text);
        this.setState({
            access_code:text,
        })
        this.addUser({email:this.state.newUser,access_code:text});
    }
    // makeAccess_Code = () =>{
    //     console.log("i made a new access_code ")
    //     let text = "";
    //     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     for (let i = 0; i < 16; i++){
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     console.log(text);
    //     this.setState({
    //         access_code:text,
    //     }) 
    //}
    componentDidMount(){
        //this will run once 
        this.getUser();
    }

    render(){
        // if(!this.state.role){
        //     return(
        //         <>
        //             <div>Loading.....</div>
        //         </>
        //     )
        // }
        console.log(this.state.role);
        if(this.state.role != "manager"){
            this.checkUser();
            return(<>
                <div>You are not authorized to use the management system</div>
            </>)
        }
        
        let userlist = <div>Loading</div>
        const hasUser = this.state.users;
        if(hasUser && this.state.users.length!=0){
            //console.log(this.state.users)
            userlist = this.state.users.map((user,i)=>(
                
                <UserCard 
                    className ="manager-usercardContainer"
                    key = {i}
                    email = {user.email}
                    access_code = {user.access_code}
                    deleteUser = {this.deleteUser}
                    type = {true}
                /> 
            )
            )
        }
        else{
            userlist = <div>No users yet</div>
        }
        let hasnonUser = this.state.nonusers;
        let nonuserlist = <div>Loading</div>
        if(hasnonUser && this.state.nonusers.length!=0){
            
           // console.log(this.state.nonusers);
            nonuserlist = this.state.nonusers.map((nonuser,i)=>(
                <UserCard 
                    className ="manager-usercardContainer"
                    key = {i}
                    email = {nonuser.email}
                    access_code = {nonuser.access_code}
                    deletenonUser = {this.deletenonUser}
                    type = {false}
                /> 
            ))
        }
        else{
            nonuserlist = <div>No users yet</div>
        }
        // .u-flex-justifyCenter {
        //     justify-content: center;
        //   }
          
        //   .u-flex-alignCenter {
        //     align-items: center;
        //   }
        return (
            <div className = "manager-Container u-flex-justifyCenter u-flex-alignCenter">
            <section>
                <h2 className= "manager-titleContainer u-flexjustifyCenter">Activated Users</h2>
                {userlist}
            </section>
            <section >
                <h2 className= "manager-titleContainer">Non-Activated Users </h2>
                {nonuserlist}
            </section>
            
            <textarea
                className = "manager-textareaContainer"
                rows = "2"
                placeholder="input email"
                value={this.state.tempvalue}
                onChange={this.handleChange}
                />
            <button
                className = "manager-buttonContainer"
                type="submit"
                value="Submit"
                onClick={this.handleSubmit}
            >Save
            </button>
            </div>
        ); 
    }
}
export default Manager;