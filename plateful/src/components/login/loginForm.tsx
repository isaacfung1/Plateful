import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User logged in successfully:', data.user);
      router.push('/volunteer');
    } else {
      const errorData = await response.json();
      setError(errorData.error);
      console.error('Login failed:', errorData.error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-semibold text-green-800">Welcome Back!</h2>
      <p className="text-gray-600">Log in to access your account</p>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="name"
            placeholder="Username"
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