"use client";

import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { WeatherData, ErrorResponse } from "./types/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const isDay = data?.isDay ?? true;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    let requestedCountry = "";
    if (city.includes(',')) {
      const parts = city.split(',');
      if (parts.length > 2) {
        setError("City not found");
        return;
      }
      requestedCountry = parts[1].trim().toUpperCase();
    }

    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Error on the search of the city");
      }
      
      const result: WeatherData = await response.json();

      if (requestedCountry && result.country && requestedCountry !== result.country.toUpperCase()) {
        throw new Error("City not found");
      }

      setData(result);
    } catch (error) {
      console.error("Erro:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }

    setLoading(false);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className={`flex flex-col items-center justify-center min-h-screen gap-6 p-6 transition-colors duration-500 ${isDay ? "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800" : "bg-gradient-to-br from-gray-900 to-black text-gray-100"}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Now</h1>
        <p className="text-gray-600">Discover the weather in any city in the world</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter the name of the city..."
          className="border border-gray-300 p-3 rounded-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-6 py-3 rounded-lg text-white font-medium transition duration-200"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading && (
        <div className="mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-3">Searching city data...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md w-full">
          <p className="text-red-700 font-medium"> {error}</p>
          <p className="text-red-600 text-sm mt-1">Try verifying the city name or try again.</p>
        </div>
      )}

      {data && <WeatherCard data={data} />}
    </main>
  );
}