import React from "react";
import LoginForm from "./loginForm";
import Header from "../home/Header";
import Footer from "../home/Footer";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="h-screen flex items-center justify-center bg-beige">
      {/* Floating Card */}
        <div className="flex w-4/5 max-w-5xl bg-white rounded-2xl custom-shadow overflow-hidden">
          {/* Left Side: Login Form */}
          <div className="w-1/2 p-6">
            <LoginForm />
          </div>

          {/* Right Side: Branding Section */}
          <div className="w-1/2 bg-green-800 text-white flex flex-col justify-center items-center p-10 relative">
            <h1 className="text-3xl font-bold mb-4">Welcome to Plateful</h1>
            <p className="text-lg text-center">
              Connecting surplus food with those in need. Together, we can make a difference.
            </p>
            <div className="absolute inset-0 opacity-20">
              <img 
                src="/images/login-image.jpg"
                alt="Background"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default LoginPage;