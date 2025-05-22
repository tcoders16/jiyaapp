import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp, GeoPoint } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddMemoryCard() {
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState(null); // Real-time location
  const [locStatus, setLocStatus] = useState("📡 Fetching location...");

  // Get user's geolocation once on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocStatus(" Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(new GeoPoint(latitude, longitude));
        setLocStatus(`📍 Location fetched`);
      },
      (err) => {
        console.error(err);
        setLocStatus(" Location access denied");
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageURL || !description || !imageFile || !location) {
      alert("Please upload image and allow location.");
      return;
    }

    try {
      const storageRef = ref(storage, `memories/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "memories"), {
        location,
        description,
        photoURL: downloadURL,
        timestamp: serverTimestamp(),
      });

      setImageURL("");
      setDescription("");
      setImageFile(null);
      alert("Memory saved! 🎉");
    } catch (error) {
      console.error("Error saving memory:", error);
      alert("Failed to save memory 😢");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImageURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-pink-100 rounded-3xl shadow-[7px_9px_0px_rgba(0,0,0,0.7)] p-6 max-w-lg w-full font-cookie text-pink-900">
      <h2 className="text-xl mb-4 text-center">📸 Add a Sweet Memory</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Show location status */}
        <p className="text-sm text-center mb-2">{locStatus}</p>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm">🖼 Upload a Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="rounded-full p-2 border border-pink-300 bg-white shadow"
          />
          {imageURL && (
            <img
              src={imageURL}
              alt="Preview"
              className="mt-3 rounded-2xl shadow-md w-full h-48 object-cover border-2 border-pink-300"
            />
          )}
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm">💬 Memory Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What makes this memory special?"
            className="rounded-xl p-3 border border-pink-300 bg-white shadow text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          ➕ Save Memory
        </button>
      </form>
    </div>
  );
}