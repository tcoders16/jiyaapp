import React from "react";
import CuteClock from "../components/CuteClock";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen patootie-skinny bg-pink-200 px-2 md:px-4 py-8 md:py-10 flex flex-col items-center justify-center space-y-8 md:space-y-10">
      
      {/* ⏰ Clock & Greeting */}
      <div className="w-full flex flex-col items-center justify-center text-center font-cookie text-pink-700">
        <CuteClock />
        <p className="text-sm text-gray-600 mt-2">Made By - Omkumar Solanki</p>
      </div>

      {/* 🧸 Testimonial Section */}
      <div className="w-full">
        <Testimonial />
      </div>

<div className="bg-pink-300 p-4 rounded-2xl shadow-[5px_5px_0px_rgba(0,0,0,0.7)] w-fit border border-pink-300 mt-10">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/8CEJoCr_9UI?autoplay=1&controls=1"
    title="YouTube Music"
    frameBorder="0"
    allow="autoplay"
    allowFullScreen
    className="rounded-xl"
  ></iframe>
</div>
    </div>
  );
}