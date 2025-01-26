import React from "react";



export default function Mission() {
  return (
    <section id="mission" className="bg-bg-main pt-[0.5rem] pb-[15rem] rounded-3xl top-[-20px]">
      <h2 className="text-6xl text-green-bg font-bold text-center mt-[1.5rem]">
      Our Mission
      </h2>
      <div className="flex flex-row mx-[6rem] mt-[2.5rem] gap-[3rem]">
      <div className="flex-1 border-2 border-white-bg h-[40rem] rounded-xl">
      <img className="w-full h-full object-cover rounded-xl" src="/images/partners-in-mission.jpg"></img>
      </div>
      <div className="flex-1">
      <div className="flex flex-col h-full p-[3.5rem]">
        <h2 className="text-4xl text-green-bg">Fighting Food Insecurity..</h2>
        <h2 className="text-4xl mt-[0.5rem] text-green-bg font-bold">One Plate at a Time</h2>
        <p className="text-green-bg text-2xl mt-16">
        At Plateful, our mission is to combat food insecurity in Kingston by connecting grocery 
        stores with food banks through a streamlined digital platform. Using AI-driven insights,
         we optimize surplus food donations and volunteer delivery routes to reduce waste, improve 
         distribution efficiency, and ensure timely support for those in need. Together, we’re building
        a sustainable and community-driven solution to make every meal count.
        </p>
        </div>
      </div>
      </div>
    </section>
  );
}