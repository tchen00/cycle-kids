/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Log = require("./models/log");
//const UserList = require("./models/userlist");
const NonUser = require("./models/nonuser")
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { isValidObjectId } = require("mongoose");
//const { reduceRight } = require("core-js/core/array");
//const { userSetter } = require("core-js/fn/symbol");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// //add users from non user list to activate user list 
// router.post("activateUser",(req,res)=>{
  
// });

//user is authorized 
router.get("/authUser",(req,res)=>{
  console.log(req.query.userId);
  User.findById(req.query.userId).then((user)=>{
    if(user!=null){
    res.send(user);
    }
    else{
      res.send(false);
    }
  })
 });

//get user list 
router.get("/getUsers",(req,res)=>{
 User.find({}).then((users)=>{
   res.send(users);
 })
});

//upddate user schema 
router.post("/updateUser",(req,res)=>{
  console.log(req.body);
  User.findByIdAndUpdate(req.body.userId,{$set:{email:req.body.email,access_code:req.body.access_code}}).then((res)=>{console.log(res)});
  console.log("updated user ");
});

//get one nonuser
router.get("/getnonUser",(req,res)=>{
  console.log("looking for non user ")
  NonUser.findOne(req.query).then((nonuser)=>{
    res.send(nonuser)
  }).catch((e)=>console.log("no user found"))
});

//get all non users 
router.get("/getnonUsers",(req,res)=>{
  NonUser.find({}).then((nonusers)=>{
    res.send(nonusers)
    
  })
});

//add user
router.post("/addUser",(req,res)=>{
  
  const newUser = new NonUser({
    email: req.body.email,
    access_code: req.body.access_code,
    role: "Teacher",
  });

  newUser.save().then((newuser)=>{res.send(newuser)});
  //console.log("I  added a user ");
  //console.log(req.body.email);
  //console.log(req.body.access_code);
  // try{
  //   let myuserList = await UserList.findOne();
  //   if(myuserList){

  //   }
  //   else{
  //     let newUserList = new UserList({
  //       logged :[],
  //       nonlogged:[newUser],
  //     })
  //   }

  // }
  // catch(e){
  //   console.log("error in adding to userr list")
  // }

});

//delete user 
router.post("/deleteUser",(req,res)=>{
  User.deleteOne(req.body).then((event)=>console.log("deleted user"))
});
//delete non user 
router.post("/deletenonUser",(req,res)=>{
  console.log("deleted non user ");
  console.log(req.body);
  NonUser.deleteOne(req.body).then((event)=>res.send(event));
});

//get the the time list 
router.get("/getLog", async (req,res) =>{
  console.log("hello")
  let filter = {"userId": req.body.userId};
  console.log(req.body.userId);
  try{
    const DataExists = await Log.findOne(filter);
    console.log(DataExists)
    if(!DataExists){
      const NewLog = new Log({
      userId: req.body.userId,
      loggintime:req.body.logIn,
      logouttime: [], 
      loggedIn: true,
      });
      NewLog.save().then((value)=>{
        res.send(value);
      });
    }
    else{
      let lit = DataExists.concat([req.body.logIn]);
      Log.updateOne(filter,{"logintime": req.body.logIn,"loggedIn":true}).then((value)=>{
        res.send(value);
      })
    }
  }  
  catch(e){
    console.log(e);
    }
  });
//
//create log in and log out list or retrieve and update 
router.post("/timelogin", async (req,res) =>{
  console.log("hello")
  let filter = {"userId": req.body.userId};
  console.log(req.body.userId);
  console.log(req.body.logIn);
  try{
    const DataExists = await Log.findOne(filter);
    // console.log(DataExists.userId);
    // console.log(req.body.logIn);
    if(!DataExists){
      const NewLog = new Log({
      userId: req.body.userId,
      logintime:[req.body.logIn],
      logouttime: [], 
      loggedIn: true,
      });
      NewLog.save().then((value)=>{
        res.send(value);
      });
    }
    else{
      
      let lit = DataExists.logintime.concat(req.body.logIn);
      Log.updateOne(filter,{$set:{"logintime": lit,"loggedIn":true}}).then((value)=>{
        res.send(value);
      })
    }
  }  
  catch(e){
    console.log(e);
    }
  });
//it tracks log out time
router.post("/timelogout",async(req,res)=>{
  let filter = {"userId":req.body.userId};
  console.log(filter);
  try{
    
    //console.log(Log.findOne(filter).logouttime);
    const Data = await Log.findOne(filter);
    console.log(Data);
    let list = Data.logouttime.concat(req.body.logOut)
    Log.updateOne(filter,{$set:{"logouttime":list,"loggedIn":false}}).then((value)=>{
      res.send(value);
    });
  }
  catch(e){
    console.log(e);
  }
});
router.get("/getTime",(req,res)=>{  
  let filter = {"userId":req.body.userId};
  Log.findOne(filter).then((value)=>{res.send(value)});
})
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
