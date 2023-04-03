import { useState } from "react";
import { Link } from "react-router-dom";

const LoggedInDropdown = ({ handleLogout, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        class="flex items-center text-sm font-medium dark:hover:text-blue-500 md:mr-0  text-white"
        type="button"
        onClick={handleDropdownToggle}
      >
        <span class="sr-only">Open user menu</span>
        {email}
        <svg
          class="w-4 h-4 mx-1.5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
          >
            <li>
              <Link
                to="/updateProfile"
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div class="py-2">
            <button
              onClick={handleLogout}
              className="text-white focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInDropdown;
