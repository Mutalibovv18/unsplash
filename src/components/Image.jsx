import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { Links } from "react-router-dom";

// global context
import {useGlobalContext} from '../hooks/useGlobalContext' 

function Image({ image, added }) {
    const {likedImages, dispatch} = useGlobalContext()
    

    const { urls, alt_description, user, links } = image;
    
    const addLikedImage = (image) => {
  const alreadyAdded = likedImages.some((img) => {
    return img.id == image.id
  })
if(!alreadyAdded) {
    dispatch({type:"LIKE", payload:image})
} else {
    dispatch({type: "UNLIKE", payload: image.id})
}
    }



    return (
        <div className="relative group">
            {true && (
                <span className="absolute h-7 w-7 border rounded-full flex justify-center items-center cursor-pointer right-2 top-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <FaRegHeart onClick={() => addLikedImage(image)} className="text-white" />
                </span>
            )}
            {added && (
                <span className="absolute h-7 w-7 border rounded-full flex justify-center items-center cursor-pointer right-2 top-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white">
                    <FaHeart onClick={() => addLikedImage(image)} className="text-red-600" />
                </span>
            )}
            <img src={urls.regular} alt={alt_description} className="w-full rounded-md" />
            <span className="absolute left-2 bottom-2 flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <img src={user.profile_image.large} alt={user.name + " avatar"} className="w-5 h-5 md:w-8 md:h-8 rounded-full" />
                <p className="text-white text-xs md:text-sm">{user.name}</p>
            </span>
            <span className="absolute h-7 w-7  rounded-full flex justify-center items-center cursor-pointer right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <a download href={links.download + "&force=true"} >
                    <FaDownload className="text-white" />
                </a>
            </span>
        </div>
    );
}

export default Image;
