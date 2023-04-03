import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const loggedInUser = window.localStorage.getItem("user");
      if (loggedInUser) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      toast.error("Enter your credentials");
    }

    try {
      const url = "http://127.0.0.1:8000/login/";
      const data = {
        email: user.email,
        password: user.password,
      };
      const response = await axios.post(url, data);
      console.log(response.data.token);
      toast.success("Logged in Successfully");
      console.log(response.data);
      window.localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.is_admin === true) {
        return navigate("/admin");
      } else {
        return navigate("/");
      }
    } catch (err) {
      console.error(err.response.data);
      //   TODO: Error handling client friendly
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          Log In
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border  sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-400 ">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-sky-500 hover:underline "
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
