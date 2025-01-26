import React from "react";

export default function Mission() {
  return (
    <section className="bg-dark-green pt-[0.5rem] pb-[15rem] rounded-3xl top-[-20px]">
      <h2 className="text-6xl text-white font-bold text-center mt-[1.5rem]">
        Our Mission
      </h2>
      <div className="flex flex-row mx-[6rem] mt-[2.5rem] gap-[3rem]">
        <div className="flex-1 border-2 border-green-bg h-[40rem] rounded-lg">
          <img src="./partners-in-mission"/>
        </div>
        <div className="flex-1">
        <div className="flex flex-col h-full p-[3.5rem]">
            <h2 className="text-4xl text-white font-bold">Hello World</h2>
            <p className="text-xl mt-[4rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec nullaLorem ipsum dolor sit amet, consectetur adipiscing elit.
              Curabitur nec nullaLorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur nec nullaLorem ipsum dolor sit amet,
              consectetur adipiscing elit. Curabitur nec nulla
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}