// react-imports
import { Link } from "react-router-dom";
import { ImageContainer } from "../components";
import { useGlobalContext } from "../hooks/useGlobalContext"



function LikedImages() {
const {likedImages} = useGlobalContext();


if(likedImages.length == 0) {
  return <div className="h-full flex justify-center items-center gap-10 flex-col">
    <h1 className="text-center text-2xl md:text-4xl">You have not chosen any images yet</h1>
    <Link to="/" className="btn btn-primary btn-sm md:btn-md">Go Home</Link>
  </div>
}
  
 return (
    <div className="align-elements">
      {likedImages.length > 0 && <ImageContainer images={likedImages}/>}
    </div>
  )
}

export default LikedImages