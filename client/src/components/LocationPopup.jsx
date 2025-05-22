import React, { useState } from "react";
import MemoryLog from "./MemoryLog";

export default function LocationPopup({ location }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memories, setMemories] = useState(
    Array(location.photos.length).fill("")
  );

  const handleMemorySave = (newMemory) => {
    const updated = [...memories];
    updated[currentIndex] = newMemory;
    setMemories(updated);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-xl shadow-md bg-white/90 backdrop-blur-md relative flex flex-col items-center justify-center text-center">
      <h3 className="text-center font-bold text-lg mb-2">📍 {location.name}</h3>

      <div className="relative w-full flex items-center justify-center">
        <img
          src={location.photos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-56 sm:h-64 object-cover rounded-lg border shadow"
        />
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? location.photos.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-1 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-1 rounded-full shadow"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === location.photos.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute top-1/2 right-1 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-1 rounded-full shadow"
        >
          ▶
        </button>
      </div>

      {/* MemoryLog */}
      <MemoryLog memory={memories[currentIndex]} onSave={handleMemorySave} />
    </div>
  );
}