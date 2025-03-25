import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

export const useCollection = ({ collectionName }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!collectionName) {
        console.error("Error: collectionName is empty");
        setError(new Error("Collection name cannot be empty"));
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched documents:", items);
        setData(items);
      } catch (error) {
        console.error("Error fetching collection:", error);
        setError(error);
      }
    };

    getData();
  }, [collectionName]);

  return { data, error };
};
