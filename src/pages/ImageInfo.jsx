import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch";

function ImageInfo() {
  const { id } = useParams();
  
  // Use your hardcoded API key
  const apiKey = "f7BdfaS-4yMU_We54UBrQGM7ZhtKHCvMrnioq0wrOFs";  
  const url = `https://api.unsplash.com/photos/${id}?client_id=${apiKey}`;

  const { data, isPending, error } = useFetch(url);

  console.log(data); 

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Image Information</h1>
      {data && (
        <>
          <img src={data.urls?.regular} alt={data.alt_description} width="500" />
          <p>Author: {data.user?.name}</p>
          <p>Description: {data.alt_description || "No description available"}</p>
          <p>Likes: {data.likes}</p>
        </>
      )}
    </div>
  );
}

export default ImageInfo;
