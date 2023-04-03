import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const CartItem = ({ name, price, qty, id, image }) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      authorization: `Token ${token}`,
    },
  };
  const removeItem = async (itemId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/order/remove_item/${itemId}`,
        config
      );
      toast.success("item deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <ToastContainer />
      <img
        src={image}
        alt="product-image"
        class="w-full rounded-lg sm:w-40 h-40"
      />
      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div class="mt-5 sm:mt-0">
          <h2 class="text-lg font-bold text-gray-900">{name}</h2>
          {/* <p class="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
        </div>
        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div class="flex items-center border-gray-100">
            {/* <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              -{" "}
            </span> */}
            <span class="px-2">Quantity:</span>
            <span class="h-8 w-8 border bg-white text-center outline-none">
              {qty}
            </span>
            {/* <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              +{" "}
            </span> */}
          </div>
          <div class="flex items-center space-x-4">
            <p class="text-sm">&#8377; {price}</p>
            <button onClick={() => removeItem(id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
