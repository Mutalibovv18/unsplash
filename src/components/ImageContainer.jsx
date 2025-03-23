import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

// components
import {Image} from './'
import { LikedImages } from "../pages";
import { useGlobalContext } from "../hooks/useGlobalContext";
function ImageContainer({ images = [] }) {
  const {likedImages} = useGlobalContext()
    return (
      <ResponsiveMasonry columnsCountBreakPoints={{
        350:2,
        750:3,
        900:4,
      }}>
       <Masonry gutter="10px">
       {images?.map((image) => (
          <Image key={image.id} image={image} added = {likedImages.some((img) => img.id == image.id)} />
          ))}
       </Masonry>
      </ResponsiveMasonry>
    );
  }
  
  export default ImageContainer;
  