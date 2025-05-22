import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationPopup from "./LocationPopup";
import AddMemoryCard from "./AddMemoryCard";

import { db } from "../firebase/firebase"; // adjust path as needed
import { collection, onSnapshot } from "firebase/firestore";

// Fix Leaflet icons for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function JiyaMap() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch memory data from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "memories"), (snapshot) => {
      const memories = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          coords: [data.location.latitude, data.location.longitude],
          photo: data.photoURL,
          description: data.description
        };
      });
      setLocations(memories);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 font-cookie text-pink-900 bg-pink-200 px-4 md:px-8 lg:px-16">

      {/* Upload Form */}
      <div className="w-full max-w-lg">
        <AddMemoryCard locationList={locations} />
      </div>

      {/* Map Display */}
      <div className="bg-pink-300 rounded-3xl shadow-[7px_9px_0px_rgba(0,0,0,0.7)] p-6 max-w-6xl w-full">
        <h2 className="text-xl text-center mb-3"> Explore Your Memories</h2>
        <div className="w-full h-[60vh] md:h-[80vh] rounded-xl overflow-hidden">
          <MapContainer
            center={[22.5, 72.9]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            className="rounded-xl"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
            />

            {locations.map((loc, index) => (
              <Marker
                key={loc.id || index}
                position={loc.coords}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              />
            ))}

            {selectedLocation && (
              <Popup
                position={selectedLocation.coords}
                onClose={() => setSelectedLocation(null)}
              >
                <div className="text-sm text-center">
                  <img src={selectedLocation.photo} alt="Memory" className="w-40 h-28 object-cover rounded-md mb-2" />
                  <p>{selectedLocation.description}</p>
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}