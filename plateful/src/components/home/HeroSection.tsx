import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="text-center py-20 bg-bg-main">
      <h1 className="text-8xl font-bold text-green-bg">Plateful</h1>
      <p className="mt-4 text-lg text-green-bg">
        Connecting grocery stores, food banks, and volunteers to reduce food
        waste and feed the community.
      </p>
      <div className="mt-8">
        <a
          href="/register"
          className="bg-green-bg text-white px-6 py-3 rounded-lg mr-4 hover:bg-green-700"
        >
          Sign Up as a Volunteer
        </a>
        <button className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
