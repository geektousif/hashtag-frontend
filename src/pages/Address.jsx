import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Address = ({ cartProducts }) => {
  const [address, setAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const navigate = useNavigate();
  const { token } = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      authorization: `Token ${token}`,
    },
  };
  const checkoutHandler = async (e) => {
    e.preventDefault();

    if (Object.values(address).includes("")) {
      toast.warning("Enter Address Correctly");
    } else {
      let fullAddress = "";
      for (let each in address) {
        fullAddress += address[each] + " , ";
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/order/place_order/",
          { ...cartProducts, address: fullAddress },
          config
        );
        console.log(response);
        toast.success("Order success");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div class="my-10 w-full md:w-96 md:max-w-full mx-auto">
      <ToastContainer />
      <h1 className="text-xl mb-5 font-bold">Enter Delivery Address :</h1>
      <div class="p-6 border border-gray-300 sm:rounded-md">
        <form>
          <label class="block mb-6">
            <span class="text-gray-700">Address line 1</span>
            <input
              value={address.address1}
              onChange={(e) =>
                setAddress({ ...address, address1: e.target.value })
              }
              autoFocus="true"
              name="address1"
              type="text"
              class="
            block
            p-2
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              placeholder=""
            />
          </label>
          <label class="block mb-6">
            <span class="text-gray-700">Address line 2</span>
            <input
              value={address.address}
              onChange={(e) =>
                setAddress({ ...address, address2: e.target.value })
              }
              name="address2"
              type="text"
              class="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              placeholder=""
            />
          </label>
          <label class="block mb-6">
            <span class="text-gray-700">City/District</span>
            <input
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              name="city"
              type="text"
              class="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              placeholder=""
            />
          </label>
          <label class="block mb-6">
            <span class="text-gray-700">State</span>
            <input
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              name="state"
              type="text"
              class="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              placeholder=""
            />
          </label>

          <label class="block mb-6">
            <span class="text-gray-700">Pincode</span>
            <input
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              name="pin"
              type="text"
              class="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              placeholder=""
            />
          </label>

          <div class="mb-6">
            <button
              onClick={checkoutHandler}
              type="submit"
              class="
              w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600
          "
            >
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
