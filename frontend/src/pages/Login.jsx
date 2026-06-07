import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { loginUser } from "../features/auth/authThunk";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await dispatch(loginUser(formData));

  if (loginUser.fulfilled.match(result)) {
  toast.success(result.payload.message);

  navigate("/dashboard");
} else {
    toast.error(result.payload?.message || "Login Failed");
  }
};

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center">Login</h1>

        <p className="text-center text-slate-500 mt-2 mb-8">Welcome Back</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have account?
          <Link to="/register" className="ml-2 text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
