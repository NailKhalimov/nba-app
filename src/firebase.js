import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAMqTltINmT_4iSw-0laAfHro0JepYafBw",
  authDomain: "nba-full-b8cee.firebaseapp.com",
  databaseURL: "https://nba-full-b8cee.firebaseio.com",
  projectId: "nba-full-b8cee",
  storageBucket: "nba-full-b8cee.appspot.com",
  messagingSenderId: "303865951311"
};
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
  const data = [];
  
  snapshot.forEach(childSnapshot => {
    console.log(childSnapshot.val())
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  });
  return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
}