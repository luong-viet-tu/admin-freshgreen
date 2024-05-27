/* eslint-disable no-undef */

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBLpI1_2vw5eEByzcvVIQcdMSAXx3nXiPs",
  authDomain: "freshgreen-401720.firebaseapp.com",
  projectId: "freshgreen-401720",
  storageBucket: "freshgreen-401720.appspot.com",
  messagingSenderId: "695374466102",
  appId: "1:695374466102:web:54daeb66e51eccdc0e9c97",
  measurementId: "G-3483C50L44",
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  /* eslint-disable-next-line no-restricted-globals */
  self.registration.showNotification(notificationTitle, notificationOptions);
});
