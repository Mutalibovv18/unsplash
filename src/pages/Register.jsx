//react-router dom
import { Form } from "react-router-dom"
import { FormInput } from "../components"
// react-icons
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

// register hook
import { useRegister } from "../hooks/useRegister"
import { useEffect } from "react";

function Register() {
  const { registerWithGoogle } = useRegister();

  useEffect(() => {
    if (!registerWithGoogle) {
      console.error("Google Register function is not available.");
    }
  }, [registerWithGoogle]);

  return (
    <div className='flex min-h-screen w-full'>
      <div className='bg-[url("https://picsum.photos/900/1200")] hidden bg-center bg-cover w-[40%] md:block'></div>
      <div className="fixed bg-black top-0 left-0 bottom-0 w-full bg-opacity-30 md:hidden"></div>
      <div className='w-full md:w-[60%]  bg-[url("https://picsum.photos/900/1200")] bg-center bg-cover flex justify-center items-center md:bg-none '>
        <Form method="post" className="px-5 md:px-0 max-w-96 w-full relative z-50">

          <h1 className="text-center text-white md:text-black text-3xl md:text-4xl font-medium mb-5 ">Register</h1>
          <div className="flex flex-col gap-3 md:gap-5  ">
            <FormInput placeholder="Full Name" name="displayName" type="text" />
            <FormInput placeholder="Email" name="email" type="email" />
            <FormInput placeholder="Password" name="password" type="password" />
            <FormInput placeholder="Confirm Password" name="password" type="password" />
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:gap-5 my-5 md:my-10">
            <button type="submit" className="btn btn-primary btn-sm grow md:btn-md">Register</button>
            <button 
              onClick={registerWithGoogle} 
              type="button"  
              className="btn btn-secondary btn-sm grow md:btn-md"
              disabled={!registerWithGoogle} 
            >
              <span>Google</span>
              <FcGoogle className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between flex-col md:flex-row text-center  ">
              <p className="text-white md:text-black">Forgot password ?</p>
             <Link to="/login">
             <p className="text-white md:text-black link link-primary">You already have account!</p>
             </Link>
            
            </div>
        </Form>
      </div>
    </div>
  )
}

export default Register;
