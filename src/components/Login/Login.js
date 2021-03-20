import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { createUserWithEmailAndPasswords, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
 
 


 



function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser]=useState({
    isSignedIn:false,
    newUser:false,
    name:'',
    email:'',
    photo:'',
    password:'',
  })
  
initializeLoginFramework();
const [loggedInUser,setLoggedInUser]=  useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn =() =>{
  handleGoogleSignIn()
  .then (res => {
    handleResponse(res, true);
  })
}
const fbSignIn =() =>{
  handleFbSignIn()
  .then (res => {
    handleResponse(res, true);
  })

}
const signOut = () => {
  handleSignOut()
  .then(res => {
      handleResponse(res, false);
  })
}

const handleResponse = (res, redirect) =>{
setUser(res);
setLoggedInUser(res);
if(redirect){
    history.replace(from);
}
}

  
 
 
 
  const handleBlur  =(e) =>{
    let isFieldValid =true;
    console.log(e.target.value,e.target.name);
    if(e.target.name ==='email'){
    isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value);

    }
    if(e.target.name ==='password'){
      const isPasswordValid =  e.target.value.length >6;
      const passwordHasNumber =   /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
}
if(isFieldValid){
  const newUserInfo = {...user};
  newUserInfo[e.target.name] =e.target.value;
  setUser (newUserInfo);



}

  }
  const handleSubmit =(e) => {
    console.log(user.email,user.password)
    if(newUser && user.email && user.password){
      createUserWithEmailAndPasswords(user.name,user.email,user.password)
      .then(res =>{
        handleResponse(res, true);

      } )

    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res =>{
        handleResponse(res, false);

      } )


    }
    e.preventDefault();

  }
  
  return (
    <div style={{textAlign: 'center'}}>
     { user.isSignedIn?
       <button onClick={signOut}>Sign Out</button>:
       <button onClick={googleSignIn}>Sign In</button>
     } 
     <button onClick={fbSignIn}>Facebook SignIn</button>
      { user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
        <img src={user.photo} alt=""/>
        </div>    
        }
        <h1> Our Own Authentication System </h1>
        <input type="checkbox" onChange={() =>setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser"> New User Sign Up</label>
        
        
      <form onSubmit={handleSubmit} action="">
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your Name"/>}
        
        <br/>
      <input type="text"onBlur={handleBlur}  name="email" placeholder="Write Your Emil Address" required/>
        <br/>
        <input type="password" onBlur={handleBlur}  required placeholder="Your password" name="password" id=""/>
        <br/>
        <input type="submit"  value={newUser ? 'SignUp':'SignIn'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
     {user.success && <p style={{color:'green'}}>User {newUser?'created' :'Logging'} SuccessFully{user.error}</p>} 
    </div>
  );
}

export default Login;

