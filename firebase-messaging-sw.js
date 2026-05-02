importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCueKXS0FR-MRDDqcJCanVBl_U4w11FJmg",
  authDomain: "afp-app-3fdf1.firebaseapp.com",
  projectId: "afp-app-3fdf1",
  messagingSenderId: "274409312091",
  appId: "1:274409312091:web:ea848342cbe7b41a7c947e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification("AFP", {
    body: payload.notification.body,
    icon: "/icon-192.png"
  });
});