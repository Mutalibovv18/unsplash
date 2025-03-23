import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch";
function ImageInfo() {
    const { id } = useParams();
    const { data, isPending, error } = useFetch(
      `https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_ACCESS_KEY}`
    );
  
    console.log(data); 
  
    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return <div>ImageInfo - {id}</div>;
  }
  
  export default ImageInfo;
  