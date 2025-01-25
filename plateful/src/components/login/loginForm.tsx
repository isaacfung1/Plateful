import React from "react";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-semibold text-green-800">Welcome Back!</h2>
      <p className="text-gray-600">Log in to access your account</p>
      <form className="flex flex-col gap-4">
        {/* Username Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="name"
            placeholder="Username"
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Username Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-green-800 text-white rounded-lg py-2 hover:bg-green-700 transition"
        >
          Sign In
        </button>

        {/* Sign-Up Link */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 font-semibold hover:underline">
            Sign Up Now
          </a>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;