"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
  });

  if (response.ok) {
    console.log("User registered successfully");
    router.push('/login');
  } else {
    console.error("Failed to register user");
    const errorData = await response.json();
    setError(errorData.error);
    console.error("Registration failed:", errorData.error);
  }
};

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-semibold text-green-800">Create an Account</h2>
      <p className="text-gray-600">Sign up to get started</p>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full outline-none text-gray-700"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none text-gray-700"
            required
          />
        </div>
        
        {/* Password Input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none text-gray-700"
            required
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-green-800 text-white rounded-lg py-2 hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-semibold hover:underline">
            Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;