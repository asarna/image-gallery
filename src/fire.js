import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDdvcr7wqQWf92GusyRqWtWx9GHKrbvhrg",
  authDomain: "outfits-bce4f.firebaseapp.com",
  databaseURL: "https://outfits-bce4f.firebaseio.com",
  projectId: "outfits-bce4f",
  storageBucket: "outfits-bce4f.appspot.com",
  messagingSenderId: "630980672676"
};
var fire = firebase.initializeApp(config);
export default fire;