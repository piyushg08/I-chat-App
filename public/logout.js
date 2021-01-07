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

  function signOut(){
    
    auth.signOut();
    alert("Signed Out");
    
  }