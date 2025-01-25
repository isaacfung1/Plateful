import React from "react";
import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-beige-100 to-green-200">
      {/* Floating Card */}
      <div className="flex w-4/5 max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-1/2 p-6">
          <LoginForm />
        </div>

        {/* Right Side: Branding Section */}
        <div className="w-1/2 bg-green-600 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome to Plateful</h1>
          <p className="text-lg text-center">
            Connecting surplus food with those in need. Together, we can make a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
