function Image({image}) {
    const {Links, urls, alt_description, user} = image
  return (
    <div>
        <img src={urls.regular} alt={alt_description} className="w-full rounded-md" />
        
    </div>
  )
}

export default Image