import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import poems from '../poems/poem.json';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch memories from Firestore and attach poems
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'memories'));
    const memoryData = snapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        quote: `${poems[index % poems.length]?.poem || '💫 A lovely moment'}\n– Omkumar`,
        message: data.description || 'No description available',
        avatar: data.photoURL || 'https://via.placeholder.com/150'
      };
    });
        setTestimonials(memoryData);
      } catch (error) {
        console.error('Failed to fetch memories:', error);
      }
    };

    fetchMemories();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) {
    return <p className="text-center text-pink-700 font-cookie text-lg">Loading memories...</p>;
  }

  const testimonial = testimonials[current];

  return (
    <div className="flex justify-center p-6">
      <div className="bg-pink-300 rounded-[2rem] shadow-[7px_9px_0px_rgba(0,0,0,0.7)] p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-xl w-full transition-transform duration-300 hover:scale-105">
        
        {/* Text & Controls */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-md font-bold mb-2 text-brown-800">
            {testimonial.quote.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <p className="text-sm text-gray-700">{testimonial.message}</p>
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-4 text-xs text-gray-600">
            <button onClick={handlePrev} className="hover:text-pink-800 transition">◀</button>
            <span>{current + 1} / {testimonials.length}</span>
            <button onClick={handleNext} className="hover:text-pink-800 transition">▶</button>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-600 mt-4 md:mt-0">
          <img
            src={testimonial.avatar}
            alt="memory"
            className="w-32 h-40 md:w-48 md:h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;