import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch";

function ImageInfo() {
  const { id } = useParams();
  const apiKey = "f7BdfaS-4yMU_We54UBrQGM7ZhtKHCvMrnioq0wrOFs";  
  const url = `https://api.unsplash.com/photos/${id}?client_id=${apiKey}`;

  const { data, isPending, error } = useFetch(url);

  console.log(data); 

  if (isPending) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {data && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">Image Information</h1>
          <img 
            src={data.urls?.regular} 
            alt={data.alt_description} 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="mt-5 text-center">
            <p className="text-lg font-semibold">📸 Author: 
              <span className="text-blue-600"> {data.user?.name}</span>
            </p>
            <p className="text-gray-600 italic mt-2">
              {data.alt_description || "No description available"}
            </p>
            <p className="text-yellow-500 font-bold mt-2">❤️ Likes: {data.likes}</p>
            <a 
              href={data.user?.links?.html} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 inline-block px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              View Author Profile
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageInfo;
