// firebase import
import { auth } from '../firebase/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// toaster
import { toast } from 'react-toastify';

// global-context
import { useGlobalContext } from './useGlobalContext';

// react-router-dom
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const { dispatch } = useGlobalContext();
    const navigate = useNavigate(); // ✅ Initialize navigation

    const registerWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);

                const user = result.user;
                dispatch({ type: "LOGIN", payload: user });
                toast.success("Welcome");

                navigate("/"); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };

    return { registerWithGoogle };
};
