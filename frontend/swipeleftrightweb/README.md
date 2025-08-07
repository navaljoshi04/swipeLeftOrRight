# ⚛️ React + Vite Project Setup

---

## 🚀 Initial Setup

- ✅ Create a React project using **Vite**.
- ✅ Install and configure **Tailwind CSS** and **DaisyUI**.
- ✅ Add a responsive **Navbar component** using DaisyUI.

---

## 🧭 Routing & Navigation

- ✅ Use **React Router DOM** for navigation between pages.
- ✅ Update UI based on the current route using React Router.
- ✅ Set up routes in `App.jsx` and use `<BrowserRouter>`, `<Routes>`, and `<Route>` components.

---

## 🎨 Component Design

- ✅ Design and structure each component with Tailwind & DaisyUI classes.
- ✅ Maintain consistent spacing, fonts, and theme styles across pages.

---

## 🧩 Outlet Component

### 🔹 What is `<Outlet />`?

- Acts as a **placeholder** for rendering child routes in a layout.
- Useful in layout components (like a Navbar + Sidebar structure).
- Ensures nested child components appear **inside** the parent route's layout.

````jsx
// In your Layout.jsx
<>
  <Navbar />
  <Outlet />  // This is where child components render
</>

# 🛠️ Frontend Setup Notes – React + Redux Toolkit + Axios

---

## ✅ 1. Create a Login Page

* Design a login UI with email and password input fields.
* Add a submit/login button with appropriate styling.
* On clicking login, make an API call to your backend for authentication.

---

## 🚀 2. Install & Understand Redux Toolkit

* Install required dependencies:

  ```bash
  npm install @reduxjs/toolkit react-redux
````

- Learn how Redux Toolkit simplifies the Redux workflow by:

  - Avoiding manual `action` & `reducer` boilerplate
  - Providing built-in support for immutability with `createSlice()`
  - Making the store setup easier with `configureStore()`

- **Use case**: Helps manage global state (like user auth) in a predictable and centralized way.

---

## 🧹 3. Redux Setup

- Install Redux Toolkit and React Redux:

  ```bash
  npm install @reduxjs/toolkit react-redux
  ```

- Configure the **Redux Store** using `configureStore()`
- Create a **Slice** using `createSlice()` to manage authentication state
- Use the `<Provider>` component from `react-redux` to wrap your `<App />` and inject the store
- Dispatch actions (like `login`, `logout`) inside your components to update global state

---

## 🌐 4. API Calls with Axios & CORS Setup

### ✨ Frontend (Client)

- Install Axios for HTTP requests:

  ```bash
  npm install axios
  ```

- Use `axios.post()` or `axios.get()` for API interactions
- Always use:

  ```js
  {
    withCredentials: true;
  }
  ```

  to send cookies/session data along with requests if needed

### 🔐 Backend (Server)

- Install `cors` and `cookie-parser`:

  ```bash
  npm install cors cookie-parser
  ```

- Add CORS middleware with config:

  ```js
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  ```

- This enables secure communication between your frontend and backend while allowing cookies/session management.

---
