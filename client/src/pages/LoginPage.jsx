/*
    Build a LoginPage Component-
    
    constraints-
      - Use a relevant HTML Tag which follow Better SEO practices.
      - Use Tailwind CSS for styling the component.
      - Component should be fully responsive and should work on all screen sizes.
      - LoginPageInput use as a child component from `components/LoginPageInput.jsx` and pass the required props to it.
*/

import { useState } from "react";
import LogInPageInput from "../components/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, isLoading, authUser } = useAuthStore();
  console.log("authUser in LogInPage:", authUser);
  const onSubmitSignInData = async (event) => {
    event.preventDefault();
    // Handle sign-in logic here

    const isValid = formData.email && formData.password;
    if (!isValid) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const isLoginSuccessful = await loginUser(formData);

    if (!isLoginSuccessful) {
      toast.error("Invalid email or password.");
    }

    if (isLoginSuccessful) {
      navigate("/");
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setErrorMessage("");
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#f8fafc_38%,#e2e8f0_100%)] px-4 py-12">
      <div className="pointer-events-none absolute -left-24 -top-20 h-48 w-48 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />

      <section className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Welcome Back
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Sign In
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Access your workspace with a calm, simple login flow.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmitSignInData}>
          <LogInPageInput formData={formData} onChange={handleInputChange} />
          <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {errorMessage && (
              <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-slate-900 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LogInPage;
