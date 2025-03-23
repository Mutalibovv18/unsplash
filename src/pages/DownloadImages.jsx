import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function DownloadImages() {
  const { downloadImages = [], dispatch } = useGlobalContext(); // Ensure `downloadImages` is always an array

  const removeFromDownloads = (imageId) => {
    if (dispatch) {
      dispatch({ type: "REMOVE_DOWNLOAD", payload: imageId });
    }
  };

  if (downloadImages.length === 0) {
    return (
      <div className="h-full flex justify-center items-center gap-10 flex-col mt-12">
        <h1 className="text-center text-2xl md:text-4xl">
          No images downloaded yet.
        </h1>
        <Link to="/" className="btn btn-primary btn-sm md:btn-md">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="align-elements mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {downloadImages.map((image) => (
        <div key={image?.id} className="relative group shadow-lg rounded-lg overflow-hidden">
          <img
            src={image?.urls?.regular ?? ""}
            alt={image?.alt_description ?? "Downloaded Image"}
            className="w-full h-64 object-cover rounded-lg transition-transform transform hover:scale-105"
          />
          <span
            onClick={() => removeFromDownloads(image?.id)}
            className="absolute top-2 right-2 h-9 w-9 bg-red-600 text-white rounded-full flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <FaTrash className="w-5 h-5" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default DownloadImages;
