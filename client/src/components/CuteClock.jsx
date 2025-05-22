import React, { useState, useEffect } from "react";

const nicknames = [
  "Angel Jiya",
  "Princess Jiya",
  "Pookie Jiya",
  "Sweetie Jiya",
  "Cupcake Jiya",
  "Snuggle Jiya",
  "Cuddlebug Jiya",
  "Peachy Jiya",
  "Cherry Jiya",
  "Bunny Jiya",
  "Baby Jiya",
  "Choco Jiya",
  "Sugarplum Jiya",
  "Ladoo Jiya",
  "Sunshine Jiya",
  "Bubbles Jiya",
  "Dimples Jiya",
  "Giggles Jiya",
  "Teddy Jiya",
  "Muffin Jiya",
  "Twinkle Jiya",
  "Pudding Jiya",
  "Cinnamon Jiya",
  "Honeybee Jiya",
  "Glitter Jiya",
  "Daisy Jiya",
  "Twinkie Jiya",
  "Button Jiya",
  "Buttercup Jiya",
  "Coconut Jiya",
  "Magic Jiya",
  "Popsicle Jiya",
  "Pumpkin Jiya",
  "Nugget Jiya",
  "Moonlight Jiya",
  "Panda Jiya",
  "Snickerdoodle Jiya",
  "Pikachu Jiya",
  "Cotton Jiya",
  "Jellybean Jiya",
  "Toffee Jiya",
  "Pixie Jiya",
  "Fluffy Jiya",
  "Mochi Jiya",
  "Kissy Jiya",
  "Cherrypop Jiya",
  "Velvet Jiya",
  "Zuzu Jiya",
  "Lilac Jiya"
];
function getISTTime() {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 60 * 60000);
}

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 20) return "Good Evening";
  if (hour >= 20 || hour < 5) return "Good Night";
}

export default function CuteClock() {
  const [time, setTime] = useState(getISTTime());
  const [nicknameIndex, setNicknameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getISTTime());
    }, 1000);

    const nicknameChange = setInterval(() => {
      setNicknameIndex((prev) => (prev + 1) % nicknames.length);
    }, 4000); // change nickname every 4 sec

    return () => {
      clearInterval(interval);
      clearInterval(nicknameChange);
    };
  }, []);

  const greeting = getGreeting(time.getHours());
  const nickname = nicknames[nicknameIndex];

  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 font-cookie text-pink-700 w-full">
      <h1 className="text-5xl">{time.toLocaleTimeString("en-IN", { hour12: true })}</h1>
      <p className="text-xl mt-2">{greeting}, {nickname} 🥰</p>
    </div>
  );
}