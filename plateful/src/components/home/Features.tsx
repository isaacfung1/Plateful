"use client";
import React from "react";

const features = [
  {
    title: "Real-Time Notifications",
    description: "Get notified of surplus food ready for donation",
    width: "20rem",
  },
  {
    title: "AI-Powered Matching",
    description: "Intelligent routing of food to where it’s needed most.",
    width: "22rem",
  },
  {
    title: "Volunteer Incentives",
    description: "Earn rewards for making a difference in your community.",
    width: "24rem",
  },
];

export default function Features() {
  return (
    <section className="py-[5rem] bg-green-bg rounded-3xl drop-shadow-md overflow-hidden mt-[-1rem]">
      <div className=" mx-auto">
        <h2 className="text-5xl font-bold text-center mb-10 text-white">
          Our Features
        </h2>
        <div className="conveyor-belt  ">
          <div className="h-full w-[150px] absolute bg-gradient-to-r from-green-bg  to-transparent z-50"></div>
          <div className="h-full w-[150px] absolute bg-gradient-to-l end-0 from-green-bg to-transparent z-50"></div>
          {/* Width = festures.length * [WIDTH_OF_FEATURE] + features.length * [WIDTH_OF_GAP] + [WDITH_OF_GAP] */}
          <div className="conveyor-belt-inner flex flex-row gap-[5rem] w-[170rem]">
            {features.concat(features).map((feature, index) => (
              <div
                key={index}
                className="flex-col w-[50rem] justify-center items-center h-[10rem] px-[1rem] bg-bg-main rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800 ">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 ">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .conveyor-belt {
          overflow: hidden;
        }

        .conveyor-belt-inner {
          display: flex;
          animation: conveyor 12s linear infinite;
        }

        @keyframes conveyor {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}