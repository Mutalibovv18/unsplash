import { useActionData } from "react-router-dom";
import { Search, ImageContainer } from "../components";
import { useFetch } from "../hooks/UseFetch";
import { useEffect, useState, useRef } from "react";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

function Home() {
  const searchParamFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParam] = useState(1);

  const prevSearchParam = useRef(searchParamFromAction)

  // environment variable 
  const apiKey = import.meta.env.VITE_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${searchParamFromAction ?? "all" }&page=${pageParam}`;

  //  `useFetch` usage
  const { data, isPending, error } = useFetch(url);

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) => {
       return pageParam === 1 ? data.results : [...prevImages, ...data.results]
      });
    }
  }, [data]);

useEffect(() => {
  if (searchParamFromAction != prevSearchParam.current) {
    setAllImages([]);
    setPageParam(1);
    prevSearchParam.current = searchParamFromAction;
  }
}, [searchParamFromAction])

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="align-elements">
      <div className="my-10">
        <Search />
      </div>
      {allImages.length > 0 && <ImageContainer images={allImages} />}
      <div className="my-10">
        <button onClick={() => setPageParam(pageParam+1)} className="btn btn-secondary btn-block">Read More</button>
      </div>
    </div>
  );
}

export default Home;
