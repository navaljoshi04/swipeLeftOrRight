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
  - - ⚙️ **Add the userAuth middleware** in profile api this middleware we can use whereever we want to secure the api
  - ♻️ **set the expiry** of jwt token and cookie to 1 day.
