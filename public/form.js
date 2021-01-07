var firebaseConfig = {
    apiKey: "AIzaSyAy-lN3w0JInYQaoar9N9pADmpyORq02-k",
    authDomain: "loging-55c53.firebaseapp.com",
    databaseURL: "https://loging-55c53.firebaseio.com",
    projectId: "loging-55c53",
    storageBucket: "loging-55c53.appspot.com",
    messagingSenderId: "30575153818",
    appId: "1:30575153818:web:dfb9556aaa306392bd0523",
    measurementId: "G-4XFN9P63L2"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();

  function signUp(){
    
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    console.log("term");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    
    alert("Signed Up"+email.value);
  }
  
  
  
  function signIn(){
        console.log("logged in")

    var email = document.getElementById("email");
    var password = document.getElementById("password");
        console.log(email.value);
        console.log(password.value);

    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e => alert(e.message));
    console.log("logged in")
    
    
    
}
  
  
  function signOut(){
    
    auth.signOut();
    alert("Signed Out");
    window.location = 'index.html'
    
  }
  
  
  
  auth.onAuthStateChanged(function(user){
    
    if(user){
      
      var email = user.email;
      window.location = 'joinroom.html';
      
      
    }else{
      
      alert("No Active User");
    }
    
    
    
  });
  

