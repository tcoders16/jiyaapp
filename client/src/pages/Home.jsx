import React, {  } from "react";
import CuteClock from "../components/CuteClock";
import Testimonial from "../components/testimonial";


export default function Home() {


  return (
    <div className="min-h-screen patootie-skinny bg-pink-200 px-2 md:px-4 py-8 md:py-10 flex flex-col items-center justify-center space-y-8 md:space-y-10">
      {/* ⏰ Clock & Greeting */}
      <div className="w-full flex flex-col items-center justify-center text-center font-cookie text-pink-700">
        <CuteClock />
        <p className="text-sm text-gray-600 mt-2 ml-22">-Made By 🩷</p>
      </div>

      {/* 🧸 Testimonial Card */}
      {/* <div className="bg-pink-300 rounded-[2rem] shadow-[7px_9px_0px_rgba(0,0,0,0.7)] p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-xl w-full transition-transform duration-300 hover:scale-105">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-md font-bold mb-2 text-brown-800">
            {testimonial.quote}
          </h2>
          <p className="text-sm text-gray-700">{testimonial.message}</p>
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-4 text-xs text-gray-600">
            <button onClick={handlePrev}>◀</button>
            <span>
              {current + 1} / {testimonials.length}
            </span>
            <button onClick={handleNext}>▶</button>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-600 mt-4 md:mt-0">
          <img
            src={testimonial.avatar}
            alt="character"
            className="w-32 h-40 md:w-48 md:h-64 object-cover rounded-lg"
          />
        </div>
      </div> */}

      <div className="">
      <Testimonial/>
      </div>
    </div>
  );
}