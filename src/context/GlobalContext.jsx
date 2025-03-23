import { createContext, useEffect, useReducer } from "react";
import { LikedImages } from "../pages";
import { action } from "../pages/Home";

export const GlobalContext = createContext()
const dataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("my-splash-data")) || {
likedImages: [],
downloadImages: [],
    };
};

const changeState = (state, action) => {
const {type, payload} = action;

switch (type) {
    case "LIKE" : 
    return {
        ...state,
        likedImages:[...state.likedImages, payload],

    };
    case "UNLIKE" :
        return {
            ...state,
            likedImages: state.likedImages.filter((image) => image.id != payload),
        };
        default :
        return state;
}

}

export function GlobalContextProvider({children}) {
    const [state, dispatch] = useReducer(changeState, dataFromLocalStorage())

    useEffect(() => {
        localStorage.setItem("my-splash-data", JSON.stringify(state))
    }, [state])

return <GlobalContext.Provider value={{ ...state, dispatch}}>{children}</GlobalContext.Provider>}