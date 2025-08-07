import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log("user", user);

  return (
    <div className="navbar bg-base-200 shadow-sm px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold tracking-wide">
          swipeLeftOrRight 💘🔥
        </a>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="text-right mr-2 hidden md:block">
            <p className="text-sm font-mono">Welcome,</p>
            <p className="text-md font-bold">{user.firstName}</p>
          </div>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user?.photoUrl} />
              </div>
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
