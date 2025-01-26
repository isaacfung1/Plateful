import React from "react";
import Link from "next/link";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Mission from "./Mission";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <Mission />
      <div className="flex justify-center mt-8">
        <Link href="/map"className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            View Map
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;