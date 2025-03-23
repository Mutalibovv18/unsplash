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

  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      {downloadImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 text-3xl font-semibold">No images downloaded yet.</p>
          <Link to="/" className="mt-6 text-2xl text-blue-500 underline">
            Go back to Home
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      )}
    </div>
  );
}

export default DownloadImages;
