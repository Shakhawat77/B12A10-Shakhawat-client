import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate, Link, useLocation } from "react-router";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return uppercase && lowercase && minLength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("Password must have uppercase, lowercase, and min 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      const userData = {
        name,
        email,
        photoURL: photoURL || null,
        createdAt: new Date().toISOString(),
      };

      await fetch("https://freelance-server-beige.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /* ---------------- Skeleton Loader ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77]">
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg animate-pulse bg-white dark:bg-gray-800/30">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded mb-4"></div>
          ))}
          <div className="h-12 bg-gray-400 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] min-h-screen">
      <Toaster />

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-5xl font-bold text-white">Register now!</h1>
          <p className="py-6 text-white/90">
            Create your account to post jobs or apply for work.
          </p>
        </div>

        <div className="card bg-gradient-to-r from-[#FF6B6B] to-[#6BCB77] w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full bg-white dark:bg-gray-800/20 text-white placeholder-white/80"
                required
              />

              <input
                type="text"
                placeholder="Photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full bg-white dark:bg-gray-800/20 text-white placeholder-white/80"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-white dark:bg-gray-800/20 text-white placeholder-white/80"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-white dark:bg-gray-800/20 text-white placeholder-white/80"
                required
              />

              <button
                className="btn btn-white w-full text-gray-800 dark:text-gray-200 font-semibold mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="divider text-white/80">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full text-white border-white hover:bg-white dark:bg-gray-800 hover:text-gray-800 dark:text-gray-200"
            >
              Continue with Google
            </button>

            <p className="mt-4 text-center text-white/90">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
