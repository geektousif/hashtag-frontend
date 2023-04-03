import React from "react";
import noImage from "../../images/No_Image_Available.jpg";
const Image = ({ image }) => {
  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div href="#">
        <img class="p-8 h-100 rounded-t-lg" src={image} alt="product image" />
      </div>

      <div class="flex items-center justify-end p-6">
        <a
          href="#"
          class="text-white  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
        >
          Delete
          {/* TODO DELETE PENDING */}
        </a>
      </div>
    </div>
  );
};

export default Image;
