import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Mission from "./Mission";
import Features from "./Features";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="z-10"><Features /></div>
      <div className="z-20"><Mission /></div>
      <Footer />
    </div>
  );
};