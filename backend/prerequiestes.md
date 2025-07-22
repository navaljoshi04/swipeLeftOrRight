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
