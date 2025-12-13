import { NextResponse } from "next/server";
import { fetchWeather } from "./services/openweather_service";
import { formatWeatherData } from "./utils/formatter_utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "Please enter a city" },
        { status: 400 }
      );
    }
    const weatherData = await fetchWeather(city);
    const formattedData = formatWeatherData(weatherData);

    return NextResponse.json(formattedData);
  } catch (error: any) 
  {
    if (error?.status === 404) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Internal server error" },{ status: 500 });
  }
}
