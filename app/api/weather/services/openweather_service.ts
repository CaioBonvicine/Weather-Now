export async function fetchWeather(city: string) {
    
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&&lang=en&appid=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw response;
        }

        return response.json();
    }
    catch (error) {
        throw error;
    }
}
