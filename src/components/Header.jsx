import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoggedInDropdown from "./LoggedInDropdown";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post(
      "http://127.0.0.1:8000/logout/",
      {},
      {
        headers: {
          authorization: `Token ${user.token}`,
        },
      }
    );
    //FIXME token too logout
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (localStorage.getItem("user")) {
    var user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <div>
      <header>
        <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="flex items-center">
              <span className="bg-white">
                <img
                  src="https://www.pngfind.com/pngs/b/404-4040022_adobe-png-logo.png"
                  className="mr-3 h-6 sm:h-9"
                  alt="Logo"
                />
              </span>
              <Link
                to="/"
                className="self-center text-xl font-semibold whitespace-nowrap text-white"
              >
                A Hashtag Project
              </Link>
            </a>
            <div className="flex items-center lg:order-2">
              {user ? (
                <>
                  <Link
                    to="/cart"
                    className="border text-slate-100 hover:bg-slate-500 bg-slate-800 focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                  >
                    View Cart &#x1f6d2;
                  </Link>
                  <LoggedInDropdown
                    email={user.user}
                    handleLogout={handleLogout}
                  />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
