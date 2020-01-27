

import Firebase from 'firebase';
const config={
    apiKey: "AIzaSyAjWd5GCyWjgyguV_L3cRkC8v2G9etAl0c",
    authDomain: "chatmaps2-21711.firebaseapp.com",
    databaseURL: "https://chatmaps2-21711.firebaseio.com",
    projectId: "chatmaps2-21711",
    storageBucket: "chatmaps2-21711.appspot.com",
    messagingSenderId: "393802820633",
    appId: "1:393802820633:web:6aee4014ee887cd9464e88",
    measurementId: "G-GF7NPC029L"
}
const firebase = Firebase.initializeApp(config);

export default firebase;