import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'firebase/firestore';



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2wyPk_Q1IJ-SPoJX_2SbGR7h5XSqXP_k",
    authDomain: "cart-b9bdc.firebaseapp.com",
    databaseURL: "https://cart-b9bdc.firebaseio.com",
    projectId: "cart-b9bdc",
    storageBucket: "cart-b9bdc.appspot.com",
    messagingSenderId: "988645356458",
    appId: "1:988645356458:web:edf2e9095ac801c946f1d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />,document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();