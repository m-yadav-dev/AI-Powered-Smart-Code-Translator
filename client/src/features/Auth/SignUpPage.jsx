/*
    Build a SignUpPage Component-
    
    constraints-
      - Use a relevant HTML Tag which follow Better SEO practices.
      - Use Tailwind CSS for styling the component.
      - Component should be fully responsive and should work on all screen sizes.
      - SignUpInput use as a child component from `components/SignUpInput.jsx` and pass the required props to it.
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpInput from "../components/SignUpInput";
import { useAuthStore } from "../../store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
// Load Vite Google client Id from environment variables

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, isLoading, googleAuth } = useAuthStore();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setErrorMessage("");
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const onSubmitSignUpData = async (event) => {
    event.preventDefault();
    const isValid = formData.name && formData.email && formData.password;
    if (!isValid) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const isSignUpSuccessful = await signUp(formData);
    if (!isSignUpSuccessful) {
      toast.error("Sign Up failed. Please try again.");
    }

    if (isSignUpSuccessful) {
      navigate("/");
    }
  };

  const handleGoogleSignUp = async (credentialResponse) => {
    const googleToken = credentialResponse?.credential;

    if (!googleToken) {
      toast.error("Google Sign Up failed. Please try again.");
      return;
    }

    const isGoogleAuthSuccessful = await googleAuth(googleToken);

    if (isGoogleAuthSuccessful) {
      navigate("/");
      return;
    }

    toast.error("Google Sign Up failed. Please try again.");
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#f8fafc_38%,#e2e8f0_100%)] px-4 py-12">
      <div className="pointer-events-none absolute -left-24 -top-20 h-48 w-48 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />

      <section className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Create Account
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Sign Up
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create your account to start translating code with a clean and simple flow.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmitSignUpData}>
          <SignUpInput formData={formData} onChange={handleInputChange} />
          <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0
              "
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {errorMessage && (
              <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </p>
            )}
            <div className="flex items-center justify-center gap-2">
              <GoogleLogin
                onSuccess={handleGoogleSignUp}
                onError={() =>
                  toast.error("Google Sign Up failed. Please try again.")
                }
                theme="outline"
                shape="rectangular"
                size="large"
                text="continue_with"
                width="300"
              />
            </div>
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-slate-900 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
