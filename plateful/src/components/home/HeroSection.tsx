import React from "react";

const HeroSection = () => {
  const handleScroll = () => {
    const missionSection = document.getElementById("mission");
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="text-center py-20 bg-bg-main">
      <h1 className="text-8xl font-bold text-dark-green font-sans">Plateful</h1>
      <p className="mt-4 text-xl text-green-bg text-sans">
        Connecting grocery stores, food banks, and volunteers to reduce food
        waste and feed the community.
      </p>
      <div className="mt-8">
        <a
          href="/register"
          className="bg-light-green hover:font-bold text-green-bg px-6 py-3 rounded-lg mr-4 hover:bg-orange-400 inline-block">
          Sign Up
        </a>
        <button
          onClick={handleScroll}
          className="bg-transparent border-2 text-green-bg border-green-bg px-6 py-3 rounded-lg hover:bg-green-bg hover:font-bold hover:text-white inline-block">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;