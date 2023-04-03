import axios from "axios";
import { useEffect, useState } from "react";

const EditProduct = ({ handleCloseModal, id }) => {
  const [product, setProduct] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = JSON.parse(localStorage.getItem("user"));

  const getProductDetail = async (id) => {
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/admin-api/products/crud/${id}/`,
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
    getProductDetail(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Token ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/admin-api/products/crud/${id}/`,
        {
          title: product.title,
          price: product.price,
          units_available: product.units,
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
        {loading && <div>Loading</div>}
        <form action="#">
          {!loading && (
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
                  value={product.title}
                  onChange={(e) => {
                    setProduct({ ...product, title: e.target.value });
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
                  value={product.units_available}
                  onChange={(e) => {
                    setProduct({ ...product, units: e.target.value });
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
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
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
                <div>
                  <img className="h-40" src={product.display_image} alt="" />
                </div>
              </div>
            </div>
          )}
          <div className="space-x-4">
            <button
              onClick={handleSubmit}
              type="submit"
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
            >
              Update
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

export default EditProduct;
