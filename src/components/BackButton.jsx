import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import PropTypes from "prop-types";

export default function BackButton({ top, left }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`group absolute flex items-center space-x-2 text-gray-600 transition-colors duration-300 hover:text-gray-800`}
      style={{ top, left }}
    >
      <IoChevronBackOutline className="text-2xl transition-all duration-300 group-hover:-translate-x-2" />
      <span className="text-lg font-medium">Go Back</span>
    </button>
  );
}

BackButton.propTypes = {
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
};
