import axios from "axios";
import { ChangeEvent, useState } from "react";

const AddProduct = ({ handleCloseModal }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    units: "",
  });
  const [displayImage, setDisplayImage] = useState();

  const { token } = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Token ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/admin-api/products/crud/",
        {
          title: newProduct.title,
          price: newProduct.price,
          units_available: newProduct.units,
          display_image: displayImage,
        },
        config
      );
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
                value={newProduct.title}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, title: e.target.value });
                }}
              />
            </div>
            <div class="w-full">
              <label
                for="units"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Units Available
              </label>
              <input
                type="text"
                name="units"
                id="units"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product units available"
                required=""
                value={newProduct.units}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, units: e.target.value });
                }}
              />
            </div>
            <div class="w-full">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required=""
                value={newProduct.price}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Display Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => setDisplayImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="space-x-4">
            <button
              type="submit"
              onClick={handleSubmit}
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
            <button
              onClick={handleCloseModal}
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
