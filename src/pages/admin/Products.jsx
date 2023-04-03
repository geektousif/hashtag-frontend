import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/admin/Product";
import Modal from "react-modal";
import AddProduct from "../../components/admin/AddProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { token } = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async () => {
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/admin-api/products/crud/",
        config
      );

      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mx-auto w-4/5 mt-16 mb-4">
      <div className="mb-8">
        <h5 className="text-2xl text-center font-bold">Products</h5>
        <button
          onClick={handleOpenModal}
          className="absolute -mt-8 right-[20%] px-4 py-3 rounded-xl bg-lime-700 text-slate-50 font-semibold "
        >
          Add Product +
        </button>
        <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
          <AddProduct handleCloseModal={handleCloseModal} />
        </Modal>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading && <div>Loading</div>}

        <table class="w-full text-sm text-left text-gray-400">
          <thead class="text-sm uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                #ID
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Units Available
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          {!loading &&
            products.map((item, key) => (
              <Product
                key={key}
                id={item.id}
                name={item.title}
                price={item.price}
                units={item.units_available}
              />
            ))}
        </table>
      </div>
    </div>
  );
};

export default Products;
