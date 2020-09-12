### BREIF_INTRODUCTION:

This repository has the **server code** of my **Cross-Platform End-to-End Messenger Application**.
More precisely, this is the **backend** of the **login/register system** that I have implemented, and 
it also enables **end-to-end chat facility** between users through the use of web sockets.

### KEY_FEATURES of Register/Login/Logout facility:

1) **Authorization** system uses **jsonwebtoken**.
2) Session management with the limit of **2 sessions per user** at a time.
3) **Otp** based **email verification** using nodemailer.
4) **Hashing** and securely storing user **passwords** using bcrypt.
5) **Backend validation** of data sent from the client.
6) **Efficient database management** as well as a clean structure for registering, logging in, and logging out users.

### KEY_FEATURES of End-to-End Messaging facility:

1) Support for **web sockets** that enables real time data transfer.
2) A logged in user has the provision to **chat end to end with any other registered user**.
3) All your **chats are preserved** in the database i.e they are not lost when you log out.
4) A **comprehensive structure** has been followed **to keep the chats** between distinct pair of users in Mongo DB cloud.
5) The entire **chat** service is **behind the JWT based auth**.

### TECHNOLOGY_STACK: 
Node.js, MongoDB, Socket.IO
