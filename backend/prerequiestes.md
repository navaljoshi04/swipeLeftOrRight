## 🚀 Features & Concepts Covered

- 🛠️ **Error Handling** using `try-catch`
- 📦 **JavaScript Object vs JSON** – Understanding the difference
- 📝 **Make the Signup API Dynamic** to receive data via `req.body`
- 🔍 **API – Get User by Email**
- 📰 **API – Feed Endpoint**: Get/Feed all the users
- 🧾 **API – Get User by ID**
- ❌ **API – Delete a User**
- ♻️ **API – Update a User**
- 🆚 **PUT vs PATCH** – Understanding the difference
- 📚 **Explore Mongoose Docs** – Understand `Model` and `Schema`
- 📧 **API – Update User Using Email ID**
- ⚙️ **Schema Enhancements** from Mongoose documentation
- ✅ **Add Validation Options**: `required`, `unique`, `lowercase`, `min`, `minLength`, `trim`
- 🧠 **Custom Validator** – Create a custom validation function for `gender`
- 🔧 **Improve DB Schema** – Apply appropriate validations on each field
- 🕒 **Add Timestamps** to the schema using `{ timestamps: true }`
- 🔒 **API-Level Validations**
  - Applied additional checks at the controller level, e.g., max skills allowed:
    ```js
    if (skills.length > 6) return res.status(400).send(...);
    ```
- 🧼 **Data Sanitization**
  - Validate data in Signup API using validator functions.- Create password hash using bcrypt.hash and save the user.
  - 🔐 Login API – Implemented authentication with proper input validation and user verification.
- 🔑 **Install & Setup Authentication Tools**  
  Installed `jsonwebtoken` and `cookie-parser` to manage user authentication securely.

- 🧠 **Create "Get Profile" API with Token-Based Authentication**  
  Developed a `GET /profile` endpoint that identifies which user is currently logged in using **JWT tokens and cookies**.  
  Here's how it works:
  - When a user signs in, the server generates a **JWT token** using a **secret key**.
  - This token is then sent back and **stored in a cookie** on the client side.
  - On protected routes like `/profile`, the server reads the token from the cookie and **verifies** it using the same secret key.
  - If valid, it confirms the user's identity, allowing secure access to the requested data.
  - ⚙️ **Add the userAuth middleware** in profile api this middleware we can use whereever we want to secure the api
  - ♻️ **set the expiry** of jwt token and cookie to 1 day.

## 📧 SwipeLeftOrRight API'S

🟢 **Authentication**
`AUTH ROUTER`

- POST /signup – `Create a new user account`
- POST /login – Log in and receive JWT token in cookie
- POST /logout – `Log out and clear token cookie`

👤 **User Profile**
`PROFILE ROUTER` - we can create separate router these routers will have the apis that are related to them.

- GET /profile – `Get the current user's profile (Protected route)`
- PATCH /profile/edit – Update user profile data
- PATCH /profile/updatePassword – `Change the user's password update this password ..`

💌 **Request System**
`CONNECTION REQUEST ROUTER`

- POST /request/send/interested/:userId – `Express interest in another user`
- POST /request/send/ignored/:userId – `Ignore another user`

🛠️ **Review Requests**

- POST /request/review/accepted/:requestId – `Accept a received request`
- POST /request/review/rejected/:requestId – `Reject a received request`

🤝 **Connections & Feed**
`USER CONNECTION STATUS ROUTER`

- GET /connections – `View your mutual connections`
- GET /request/recieved – See who has sent you requests
- GET /feed – Browse profiles of other users
  ℹ️ Status values: `ignored, interested, accepted, rejected`

- 📘 **Read the documentation of express.Router**
  Understand how express.Router helps in modularizing route handling in Express applications.

- 📁 **Create a routes/ folder**
  Organize your application by managing all route-related logic in one place.

- 🧩 **Inside routes/, create the following routers**:
  - authRouter.js – for authentication-related routes (login, signup, logout, etc.)
  - profileRouter.js – to handle user profile-related APIs
  - requestRouter.js – for handling requests (such as book borrowing, friend requests, etc.)

-🔌 **Import and use the routers in app.js** - Replace direct route definitions in app.js with these modular routers. - ✅ Why use routers? - Makes your code cleaner and easier to maintain - Helps you separate concerns (auth logic stays in auth router) - Encourages scalability as your app grows

## 📚 Daily Task Notes

---

### ✅ Reading

- 📖 **Read the article about compound indexes**  
  Understand **why we use them** and **why unnecessary indexes should be avoided**.

---

### 🛠️ Development

- 🧩 **Create Connection Request Schema**

- 🔗 **Implement Send Connection Request API**  
  Think through **all edge cases** such as:
  - Duplicate requests
  - Invalid user IDs
  - Self-connections
  - Valid status values (`interested`, `ignored`)

---

### 📘 Mongoose Practice

- 🔍 **Review Queries in Mongoose**
  - `$or` query
  - `$and` query
  - `schema.pre` function

# 🔗 Accept/Reject Connection Request API

## ✅ Objective

## Implement the **Accept/Reject Connection Request API**, handling all possible edge cases and ensuring data integrity.

## 📌 Core Considerations

- 🛑 **Duplicate Requests**  
  Avoid processing the same connection request multiple times.
- ❌ **Invalid User IDs**  
  Ensure both `fromUserId` and `toUserId` are valid and exist in the system.
- 📝 **Valid Status Values Only**  
  Accept only `accepted` or `rejected` as status values.

```js
// Sample Query
ConnectionRequest.findOne({
  _id: requestId,
  toUserId: loggedInUser._id,
  status: "interested"
});

## 📖 Study Topics

- Read about **`ref`** and **`populate`** in Mongoose:
  - Understand **why** they are used.
  - Understand **how** they help in defining relationships between MongoDB documents.

- Learn how to **create relationships between schemas** using the `ref` property in Mongoose.

---
## 🛠️ Implementation Task

- Create the following API route: `/user/requests/recieved`
- Ensure all **validations** and **authorization checks** are properly implemented.
- The endpoint should return the list of requests received by a user.
```
