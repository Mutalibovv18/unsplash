import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

// components
import {Image} from './'
function ImageContainer({ images = [] }) {
    return (
      <ResponsiveMasonry columnsCountBreakPoints={{
        350:2,
        750:3,
        900:4,
      }}>
       <Masonry gutter="10px">
       {images?.map((image) => (
          <Image key={image.id} image={image} />
          ))}
       </Masonry>
      </ResponsiveMasonry>
    );
  }
  
  export default ImageContainer;
  