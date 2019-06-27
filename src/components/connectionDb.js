const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

var firebaseConfig = {
  apiKey: 'AIzaSyDtUkL2YzGq67RxXWYVr_XE1aCr2L-T1Ls',
  authDomain: 'groupprojectweek7.firebaseapp.com',
  databaseURL: 'https://groupprojectweek7.firebaseio.com',
  projectId: 'groupprojectweek7',
  storageBucket: 'groupprojectweek7.appspot.com',
  messagingSenderId: '1569729536',
  appId: '1:1569729536:web:92fe6626462ed45c'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

export default db
