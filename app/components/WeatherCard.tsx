import { WeatherData } from "../types/weather";

export default function WeatherCard({ data }: { data: WeatherData }) {
  const isDay = data.isDay;

  return (
    <div
      className={`mt-8 p-6 rounded-xl shadow-lg max-w-md w-full transition-colors
        ${isDay ? "bg-white border" : "bg-gray-800 border border-gray-700"}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDay ? "text-gray-800" : "text-gray-100"
            }`}
          >
            {data.city}
            {data.country && `, ${data.country}`}
          </h2>

          {data.time && data.date && (
            <p
              className={`text-sm mt-1 ${
                isDay ? "text-gray-500" : "text-gray-400"
              }`}
            >
              🕒 {data.date} • {data.time}
            </p>
          )}

          <p
            className={`text-sm ${
              isDay ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Current condition
          </p>
        </div>

        <div className="text-right">
          <span className="text-4xl font-bold text-blue-600">
            {data.temp}°C
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div
          className={`flex items-center gap-3 p-3 rounded-lg
            ${isDay ? "bg-blue-50" : "bg-gray-700"}`}
        >
          <div className="text-blue-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
              />
            </svg>
          </div>

          <p
            className={`font-medium capitalize ${
              isDay ? "text-gray-800" : "text-gray-100"
            }`}
          >
            {data.condition}
          </p>
        </div>

        {data.humidity && (
          <div
            className={`flex items-center justify-between p-3 rounded-lg
              ${isDay ? "bg-gray-50" : "bg-gray-700"}`}
          >
            <span className={isDay ? "text-gray-700" : "text-gray-300"}>
              Humidity
            </span>
            <span className={isDay ? "text-gray-800" : "text-gray-100"}>
              {data.humidity}%
            </span>
          </div>
        )}

        {data.windSpeed && (
          <div
            className={`flex items-center justify-between p-3 rounded-lg
              ${isDay ? "bg-gray-50" : "bg-gray-700"}`}
          >
            <span className={isDay ? "text-gray-700" : "text-gray-300"}>
              Wind
            </span>
            <span className={isDay ? "text-gray-800" : "text-gray-100"}>
              {data.windSpeed} m/s
            </span>
          </div>
        )}
      </div>

      <div
        className={`mt-6 pt-4 border-t text-center
          ${isDay ? "border-gray-100 text-gray-500" : "border-gray-600 text-gray-400"}`}
      >
        <p className="text-sm">Data provided by OpenWeather</p>
      </div>
    </div>
  );
}
