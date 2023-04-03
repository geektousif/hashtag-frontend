import { useEffect, useState } from "react";
import axios from "axios";

import CartItem from "../components/CartItem";
import Address from "./Address";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddress, setShowAddress] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      authorization: `Token ${token}`,
    },
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/order/cart/",
        config
      );

      setCartProducts(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  let totalCalculate = cartProducts.reduce(
    (acc, curVal) => acc + curVal.price,
    0
  );

  useEffect(() => {
    fetchProducts();
  }, []);
  //   TODO re render page when item deleted
  return (
    // TODO make jsx attributes correct
    <div class="h-full bg-gray-100 pt-20">
      <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg md:w-2/3">
          {loading && <div>Loading</div>}
          {!loading &&
            (cartProducts.length > 0
              ? cartProducts.map((item, key) => (
                  <CartItem
                    key={key}
                    id={item.id}
                    name={item.product.title}
                    price={item.price}
                    qty={item.quantity}
                    image={item.product.display_image}
                  />
                ))
              : "No Product available in cart")}
        </div>
        {/* <!-- Sub total --> */}
        {cartProducts.length > 0 && (
          <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            {/* <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">$129.99</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">$4.99</p>
          </div>
          <hr class="my-4" /> */}
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">
                  &#8377;{totalCalculate} INR
                </p>
                <p class="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            {!showAddress && (
              <button
                onClick={() => {
                  setShowAddress(true);
                }}
                class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Continue
              </button>
            )}
            {showAddress && <Address cartProducts={cartProducts} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
