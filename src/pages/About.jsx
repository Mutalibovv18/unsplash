import React, { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { db } from "../firebase/firebaseConfig";

function About() {
  const { data, error } = useCollection({ collectionName: "images" });
  const [localData, setLocalData] = useState([]);

  React.useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!localData || localData.length === 0) return <p>Loading...</p>; 

  // Commented out delete function
  /*
  const deleteDocFromCollection = async (id) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "images", id));
      console.log(`Deleted document with ID: ${id}`);

      // Remove the item from local state (disappears without refresh)
      setLocalData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };
  */

  return (
    <div className="align-elements py-5">
      {localData.map((item) => (
        <div key={item.id} className="card">
          <div className="card-body border mb-3">
            <h1 className="text-2xl font-medium">{item.title || "No Title"}</h1>
            <p>{item.description || "No Description"}</p>
            <div className="flex gap-4">
              <button className="btn btn-primary self-start">
                {item.completed ? "Uncompleted" : "Completed"}
              </button>
              {/* Delete button still appears but does nothing */}
              <button className="btn btn-secondary">
                Delete (Disabled)
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
