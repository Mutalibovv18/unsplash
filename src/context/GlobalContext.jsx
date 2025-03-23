import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  try {
    const savedData = JSON.parse(localStorage.getItem("my-splash-data"));
    return savedData || { likedImages: [], downloadImages: [] };
  } catch {
    return { likedImages: [], downloadImages: [] };
  }
};

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LIKE":
      return { ...state, likedImages: [...state.likedImages, payload] };

    case "UNLIKE":
      return { ...state, likedImages: state.likedImages.filter((image) => image.id !== payload) };

    case "DOWNLOAD":
      if (!state.downloadImages.some((img) => img.id === payload.id)) {
        return { ...state, downloadImages: [...state.downloadImages, payload] };
      }
      return state; 

    case "REMOVE_DOWNLOAD":
      return { ...state, downloadImages: state.downloadImages.filter((img) => img.id !== payload) };

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, dataFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
