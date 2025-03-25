import React from "react";
import { useCollection } from "../hooks/useCollection";

function About() {
  const { data, error } = useCollection({ collectionName: "images" });

  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data || data.length === 0) return <p>Loading...</p>; // Handle loading state

  return (
    <div className="align-elements py-5">
      {data.map((item, index) => (
        <div key={item.id || index} className="card">
          <div className="card-body border mb-3">
            <h1 className="text-2xl font-medium">{item.title || "No Title"}</h1>
            <p>{item.description || "No Description"}</p>
            <button className="btn btn-primary self-start">
              {item.completed ? "Uncompleted" : "Completed"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
