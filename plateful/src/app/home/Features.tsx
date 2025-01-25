import React from "react";

const Features = () => {
  const features = [
    {
      title: "Real-Time Food Tracking",
      description: "Get notified of surplus food ready for donation.",
    },
    {
      title: "AI-Powered Matching",
      description: "Intelligent routing of food to where it’s needed most.",
    },
    {
      title: "Volunteer Incentives",
      description: "Earn rewards for making a difference in your community.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <div key={index} className="w-80 p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;