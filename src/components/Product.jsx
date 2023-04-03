import noImage from "../images/No_Image_Available.jpg";

const Product = ({ name, imageUrl, price }) => {
  const gotoProductPage = async (id) => {};
  return (
    <div class="flex flex-col justify-between w-full  border rounded-lg shadow bg-gray-800 border-gray-700">
      <a href="#" className="flex justify-center">
        {
          <img
            class="p-8 rounded-t-lg h-[300px]"
            src={imageUrl || noImage}
            alt="product image"
          />
        }
      </a>
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-white">
            {name}
          </h5>
        </a>

        <div class="mt-3 flex items-center justify-between">
          <span class="text-3xl font-bold text-white">₹{price}</span>
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
