import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "../../components/admin/Image";
import axios from "axios";
import Modal from "react-modal";
import ImageUpload from "../../components/admin/ImageUpload";

const MultipleImages = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { id } = useParams();
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(true);

  const { token } = JSON.parse(localStorage.getItem("user"));

  const fetchImages = async (id) => {
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/admin-api/products/${id}/images/`,
        config
      );

      setImages(response.data);
      console.log(images);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(id);
  }, []);
  return (
    <div className="my-8">
      <div className="my-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Multiple Images </h1>
        <span>
          <button
            href="#"
            onClick={handleOpenModal}
            class="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-teal-600 hover:bg-teal-700 focus:ring-teal-800"
          >
            Add Image
          </button>
          <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
            <ImageUpload handleCloseModal={handleCloseModal} />
          </Modal>
        </span>
      </div>
      {loading && <div>Loading</div>}
      <div className="flex flex-wrap justify-center mx-auto gap-8">
        {!loading &&
          images.map((item, key) => <Image key={key} image={item.image} />)}
      </div>
    </div>
  );
};

export default MultipleImages;
