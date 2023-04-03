import { useState } from "react";
import Modal from "react-modal";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom";

const Product = ({ id, name, price, units }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <tbody>
      <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
        <td class="px-6 py-4">{id}</td>
        <th
          scope="row"
          class="px-6 py-4 font-medium whitespace-nowrap text-white"
        >
          {name}
        </th>
        <td class="px-6 py-4">₹{price}</td>
        <td class="px-6 py-4">{units}</td>

        <td class="px-6 py-4 text-right space-x-4">
          <button
            onClick={handleOpenModal}
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </button>
          <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
            <EditProduct id={id} handleCloseModal={handleCloseModal} />
          </Modal>

          <button
            href="#"
            class="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Delete
            {/* TODO: DELETE PENDING */}
          </button>
          <Link to={`${id}/images`}>
            <button
              href="#"
              class="font-medium text-white border border-white rounded-md px-4 py-2 hover:bg-white hover:text-black"
            >
              Manage Images
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default Product;
