import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate, Link, useLocation } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success("Login successful!");
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
      navigate(from, { replace: true });
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
          {[...Array(3)].map((_, i) => (
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
          <h1 className="text-5xl font-bold text-white">Login now!</h1>
          <p className="py-6 text-white/90">
            Access your account to post jobs or apply for work.
          </p>
        </div>

        <div className="card bg-gradient-to-r from-[#FF6B6B] to-[#6BCB77] w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="space-y-4">
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

              <div className="text-right">
                <span className="text-sm text-blue-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <button
                className="btn btn-white w-full text-gray-800 dark:text-gray-200 font-semibold mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
