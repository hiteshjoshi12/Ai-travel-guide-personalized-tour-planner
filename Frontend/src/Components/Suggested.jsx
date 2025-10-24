import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
const Suggested = () => {

  const [tripCategories, setTripCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/suggested-trips');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTripCategories(data);
      } catch (e) {
        console.error("Failed to fetch trips:", e);
        setError("Failed to load suggestions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []); 

  if (loading) {
    return (
      <div className="bg-[#111313] min-h-screen p-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Loading Suggestions...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#111313] min-h-screen p-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#111313] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Travel Suggestions
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Discover curated destinations perfect for your next adventure.
          </p>
        </div>
        {tripCategories.map((category) => (
          <section key={category._id || category.title} className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">{category.title}</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {category.trips.map((trip) => (
                  <CarouselItem key={trip._id || trip.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[3/4]">
                      <img
                        src={trip.image}
                        alt={`Image of ${trip.destination}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/300x400/cccccc/333333?text=Error';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <h2 className="absolute bottom-4 left-4 text-xl font-bold text-white transition-opacity duration-300 group-hover:opacity-0">
                        {trip.destination}
                      </h2>
                      <div className="absolute inset-0 bg-black/80 p-4 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-bold mb-2">{trip.destination}</h3>
                        <div className="text-left w-full text-sm">
                          <p className="font-semibold text-cyan-400 uppercase tracking-wider text-xs">Highlights</p>
                          <ul className="list-disc list-inside mb-2">
                            {trip.highlights.slice(0, 3).map((h, index) => <li key={index}>{h}</li>)}
                          </ul>
                          <p className="font-semibold text-cyan-400 uppercase tracking-wider text-xs">Best Time</p>
                          <p>{trip.bestTimeToVisit}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-14 bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white" />
              <CarouselNext className="mr-14 bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white" />
            </Carousel>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Suggested;

