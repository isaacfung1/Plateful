import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Mission from "./Mission";
import Footer from "./Footer";
import Link from "next/link";


const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <Mission />
      <Footer />
    </div>
  );
};

export default HomePage;