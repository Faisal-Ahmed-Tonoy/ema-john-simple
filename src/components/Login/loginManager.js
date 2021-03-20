import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}


export  const handleGoogleSignIn =() =>{
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return   firebase.auth().signInWithPopup(googleProvider)
  .then(res =>{
    const {displayName,photoURL,email} =res.user;
    const signInUser ={
      isSignedIn:true,
      name:displayName,
      email:email,
      photo:photoURL,
      success:true
    } 
    return (signInUser);
  })
   .catch(err =>{
    console.log(err);
    console.log(err.message);
  })

}
export const handleFbSignIn =() =>{
  const fbProvider = new firebase.auth.FacebookAuthProvider(); 
  return firebase.auth().signInWithPopup(fbProvider)
.then((result) => {
   
  var token = result.credential.accessToken;


  // The signed-in user info.
  var user = result.user;
  user.success=true;
  return user;
 

  // ...
})
.catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

  // ...
});

}

export const handleSignOut =() => {
 return firebase.auth().signOut()
  .then(res =>{
    const signedOutUser ={
      isSignedIn:false,
      name:'',
      email:'',
      photo:'',
      error:'',
      success:false
    }
    return (signedOutUser)

  })
  .catch (err => {

  })
 

}
export const createUserWithEmailAndPasswords = (name,email,password) => {
    
  console.log('submitting')
  return firebase.auth().createUserWithEmailAndPassword(email, password)
.then(res => {
const newUserInfo =res.user;
newUserInfo.error='';
newUserInfo.success=true;

updateUserName(name);
return newUserInfo;
console.log(res);
// Signed in 

// ...
})
.catch((error) => {
const newUserInfo ={};
newUserInfo.error=error.message;
newUserInfo.success=false;
return newUserInfo;

 
console.log(error.message)
// ..
});
}
export const signInWithEmailAndPassword = (email,password) => {
  
 return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res) => {
    // Signed in
    const newUserInfo =res.user;
    newUserInfo.error='';
    newUserInfo.success=true;
    return newUserInfo;
    // ...
  })
  .catch((error) => {
    const newUserInfo ={};
    newUserInfo.error=error.message;
    newUserInfo.success=false;
    return (newUserInfo);
     
    console.log(error.message)
    // ..
  
  });
}
const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
    
  }).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}