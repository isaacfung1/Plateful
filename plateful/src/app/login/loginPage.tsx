import React from "react";
import Header from "../home/Header";
import Footer from "../home/Footer";
import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <div className="fade-in">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;