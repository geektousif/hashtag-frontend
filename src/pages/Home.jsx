import { ToastContainer } from "react-toastify";
import Products from "../components/Products";

const Home = () => {
  if (localStorage.getItem("user")) {
    var { user, token } = JSON.parse(localStorage.getItem("user"));
  }
  return (
    <>
      <ToastContainer />
      <main>
        <div className="text-center">
          {token ? (
            <>
              <h1 className="mt-10 text-3xl font-bold">
                Welcome {user} to loggedin page
              </h1>
              <Products />
            </>
          ) : (
            <h1 className="mt-10 text-3xl font-bold">
              You have to login to perform any task here
            </h1>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
