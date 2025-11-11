import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate, Link } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login with email/password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      navigate("/"); // Navigate to home page
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate("/"); // Navigate to home page
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your account to post jobs or apply for work.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                required
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />

              {/* Forget password link (text only) */}
              <div className="text-right">
                <span className="text-sm text-blue-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              {/* Login Button */}
              <button
                className="btn btn-neutral w-full mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="divider">OR</div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            {/* Link to Register */}
            <p className="mt-4 text-center">
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
