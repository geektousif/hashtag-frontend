import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import noImage from "../images/No_Image_Available.jpg";

const ProductPage = () => {
  let { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      authorization: `Token ${token}`,
    },
  };
  // Fetch products

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/products/${id}/`,
        config
      );

      setProduct(response.data);
      console.log(product);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  // Add to Cart
  const [quantity, setQuantity] = useState(1);
  const addToCartClickHandler = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/products/${id}/add_order/`,
        { quantity: quantity },
        config
      );
      console.log(response.data);
      toast.success("Added to Cart successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-16">
      <ToastContainer />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            {loading && <div>Loading</div>}
            {!loading && (
              <div x-data="{ image: 1 }" x-cloak>
                <div class="h-64 md:h-80 rounded-lg mb-4">
                  <img
                    src={product.display_image || noImage}
                    class="h-64 md:h-80 rounded-lg mb-4 flex items-center justify-center"
                  />

                  {/* <div
                  x-show="image === 2"
                  class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                >
                  <span class="text-5xl">2</span>
                </div>

                <div
                  x-show="image === 3"
                  class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                >
                  <span class="text-5xl">3</span>
                </div>

                <div
                  x-show="image === 4"
                  class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                >
                  <span class="text-5xl">4</span>
                </div> */}
                  {/* TODO: Multiple Image */}
                </div>

                <div class="flex -mx-2 mb-4">
                  {/* <template x-for="i in 4">
              <div class="flex-1 px-2">
                <button x-on:click="image = i" :class="{ 'ring-2 ring-indigo-300 ring-inset': image === i }" class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                  <span x-text="i" class="text-2xl"></span>
                </button>
              </div>
            </template> */}
                </div>
              </div>
            )}
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {product.title}
            </h2>
            <p class="text-gray-500 text-sm">
              By{" "}
              <a href="#" class="text-indigo-600 hover:underline">
                ABC Company
              </a>
            </p>

            <div class="flex items-center space-x-4 my-4">
              <div>
                <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span class="text-indigo-400 mr-1 mt-1">₹</span>
                  <span class="font-bold text-indigo-600 text-3xl">
                    {product.price}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                {/* TODO: <p class="text-green-500 text-xl font-semibold">Save 12%</p> */}
                <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>

            <p class="text-gray-500">
              Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
              exercitationem porro saepe ea harum corrupti vero id laudantium
              enim, libero blanditiis expedita cupiditate a est.
            </p>
            {/* TODO add description */}

            <div class="flex py-4 space-x-4">
              <div class="relative">
                <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Qty
                </div>
                <select
                  name="qty"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <svg
                  class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={addToCartClickHandler}
                class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
