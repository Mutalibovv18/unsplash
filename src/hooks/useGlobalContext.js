import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export const useGlobalContext = () => {

    const context = useContext(GlobalContext)
    if(!context) {
        throw new Error("useGlobal context must be in the GlobalContextProvider()");
    }

return context
};
