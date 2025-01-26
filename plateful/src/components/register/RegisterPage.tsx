import React from "react";
import Header from "../home/Header";
import Footer from "../home/Footer";
import RegisterForm from "./RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div>
      <Header />
      <div className="h-screen flex items-center justify-center bg-beige">
        {/* Floating Card */}
        <div className="flex w-4/5 max-w-5xl bg-white rounded-2xl custom-shadow overflow-hidden">
          {/* Left Side: Register Form */}
          <div className="w-1/2 p-6">
            <RegisterForm />
          </div>

          {/* Right Side: Branding Section */}
          <div className="w-1/2 bg-green-800 text-white flex flex-col justify-center items-center p-10">
            {/*<img src="/login-image.png" width={100} height={100} alt="Login Image" />*/}
            <h1 className="text-3xl font-bold mb-4">Join Plateful</h1>
            <p className="text-lg text-center">
              Connecting surplus food with those in need. Together, we can make a difference.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;