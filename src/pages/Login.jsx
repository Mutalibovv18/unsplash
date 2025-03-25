import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { FcGoogle } from "react-icons/fc";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

// Action function to handle login & password reset
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const resetEmail = form.get("email_for_reset");

  if (resetEmail?.trim()) {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, resetEmail);
      return { message: "Check your email for the reset link." };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { email, password };
};

function Login() {
  const actionData = useActionData();
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();
  const [showResetForm, setShowResetForm] = useState(false);

  useEffect(() => {
    if (actionData?.email && actionData?.password) {
      loginWithEmail(actionData.email, actionData.password);
    }
  }, [actionData]);

  return (
    <div className="flex min-h-screen w-full">
      <div className='bg-[url("https://picsum.photos/900/1200")] hidden bg-center bg-cover w-[40%] md:block'></div>
      <div className="fixed bg-black top-0 left-0 bottom-0 w-full bg-opacity-30 md:hidden"></div>
      <div className="w-full md:w-[60%] bg-[url('https://picsum.photos/900/1200')] bg-center bg-cover flex justify-center items-center md:bg-none">
        <Form method="post" className="px-5 md:px-0 max-w-96 w-full relative z-50">
          <h1 className="text-center text-white md:text-black text-3xl md:text-4xl font-medium mb-5">
            {showResetForm ? "Reset Password" : "Login"}
          </h1>
          {actionData?.message && (
            <p className="text-green-500 text-sm mb-4 text-center">{actionData.message}</p>
          )}
          {actionData?.error && (
            <p className="text-red-500 text-sm mb-4 text-center">{actionData.error}</p>
          )}

          {!showResetForm ? (
            <>
              {/* Login Form */}
              <div className="flex flex-col gap-3 md:gap-5">
                <FormInput placeholder="Email" name="email" type="email" />
                <FormInput placeholder="Password" name="password" type="password" />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:gap-5 my-5 md:mt-10">
                <button type="submit" className="btn btn-primary btn-sm grow md:btn-md">Login</button>
                <button onClick={registerWithGoogle} type="button" className="btn btn-secondary btn-sm grow md:btn-md">
                  <span>Google</span>
                  <FcGoogle className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between flex-col md:flex-row text-center">
                <button type="button" className="text-white md:text-black link link-primary" onClick={() => setShowResetForm(true)}>
                  Forgot Password?
                </button>
                <Link to="/register">
                  <p className="text-white md:text-black link link-primary">You don't have an account?</p>
                </Link>
              </div>
            </>
          ) : (
            <>
             
              <p className="text-center text-white md:text-black mb-4">Enter your email to receive a reset link.</p>
              <div className="flex flex-col gap-3 md:gap-5">
                <FormInput placeholder="Email" name="email_for_reset" type="email" required />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:gap-5 my-5 md:mt-10">
                <button type="submit" className="btn btn-primary btn-sm grow md:btn-md">Send Reset Link</button>
                <button type="button" className="btn btn-secondary btn-sm grow md:btn-md" onClick={() => setShowResetForm(false)}>
                  Back to Login
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
