import { Link } from "react-router-dom";

const SectionCard = ({ title, image }) => {
  return (
    <div className="pt-4 w-full max-w-sm  border  rounded-lg shadow  bg-teal-50 border-teal-300">
      <Link to={title}>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={image}
            alt={title + " image"}
          />
          <h5 className="capitalize mb-1 text-xl font-medium text-gray-900 ">
            {title}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default SectionCard;
