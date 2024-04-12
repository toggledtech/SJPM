function signIn() {
  const firebaseConfig = {
    apiKey: "AIzaSyDzJe3M-hjERgAx5U8bHfV-dBK2QFQJZ_g",
    authDomain: "carbon-host.firebaseapp.com",
    projectId: "carbon-host",
    storageBucket: "carbon-host.appspot.com",
    messagingSenderId: "769351599940",
    appId: "1:769351599940:web:6bf6136946685026a4b911",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();


  var provider = new firebase.auth.GithubAuthProvider();

  provider.addScope("repo");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // console.log(result.credential)

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;

      var user = result.user;

      db.collection("pm-user")
      .doc(user.providerData[0].uid)
      .set({
        name: user.displayName,
        email: user.email,
        uid: user.providerData[0].uid,
        photoURL: user.photoURL,
      }, { merge: true })
      .then(() => {
        window.localStorage.setItem("displayName", user.displayName);
        window.localStorage.setItem("email", user.email);
        window.localStorage.setItem("photoURL", user.photoURL);
        window.localStorage.setItem("uid", user.providerData[0].uid);
        window.localStorage.setItem('github', 'true')

        console.log(user.providerData[0].uid);

        window.location = '/dashboard/'
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
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