// firebase import
import { auth } from '../firebase/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
                toast.success(`Welcome, ${user.displayName}`);

                navigate("/"); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };
const registerWithEmail = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
    });    
    // Signed up 
    const user = userCredential.user;
    dispatch({ type: "LOGIN", payload: user });
    toast.success("Welcome");
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage);
    // ..
  });
    
}

    return { registerWithGoogle, registerWithEmail };
};
