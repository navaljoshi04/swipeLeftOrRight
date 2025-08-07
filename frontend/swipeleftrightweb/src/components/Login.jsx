import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [emailId, setEmailId]=useState("");
  const [password, setPassword]=useState("");
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const handleLogin = async()=>{
    try {
      const res= await axios.post("http://localhost:3000/login", {email:emailId, password},{withCredentials:true});
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <div className="card card-side bg-base-100 shadow-sm ">
          <figure className="h-[30rem] w-[20rem]  mx-auto my-10 flex justify-center items-center">
            <img
              className="h-full w-full object-cover ml-8 mb-10 rounded-2xl"
              src="https://imgs.search.brave.com/1wN3oI_fEsk2eyE14jsSLcnDEbvRJdkBTkBxQQxPs7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGV5c2F0dXJkYXku/Y28vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDgvSU1HXzM2/MzEtc2NhbGVkLWUx/NjQ0NTEyMjcyNDUx/LmpwZWc"
              alt="Dating"
            />
          </figure>
          <div className="card-body ml-22">
            <h2 className="card-title text-2xl font-serif mb-4">
              Login to swipeLeftOrRight
            </h2>

            {/* Email Field */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-serif">Email</span>
              </label>
              <input
                type="email"
                value={emailId}
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs font-mono"
                onChange={(e)=>setEmailId(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full max-w-xs mt-4">
              <label className="label">
                <span className="label-text font-serif">Password</span>
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs font-mono"
              />
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
