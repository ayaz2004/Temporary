import { admin } from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const message = {
  notification: {
    title: "Hello!",
    body: "This is a push notification.",
  },
  token: "<RECIPIENT_FIREBASE_TOKEN>",
};

admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Notification sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending notification:", error);
  });
