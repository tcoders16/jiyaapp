import React, { useState } from "react";

export default function MemoryLog({ memory, onSave }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(memory);

  const handleSave = () => {
    onSave(temp);
    setEditing(false);
  };

  return (
    <div className="mt-3 flex flex-col items-center justify-center text-center w-full px-2">
      {editing ? (
        <div className="flex flex-col items-center gap-2 w-full max-w-md">
          <textarea
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            className="w-full p-2 rounded-md border text-sm resize-none"
            rows={3}
          />
          <button
            onClick={handleSave}
            className="bg-pink-200 hover:bg-pink-300 px-4 py-1 rounded text-sm"
          >
            Save ✍️
          </button>
        </div>
      ) : (
        <p
          className="text-sm italic text-gray-700 cursor-pointer w-full max-w-md"
          onClick={() => setEditing(true)}
        >
          “{memory || 'Click to add a memory...'}”
        </p>
      )}
    </div>
  );
}