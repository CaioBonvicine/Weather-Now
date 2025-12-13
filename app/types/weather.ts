export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity?: number;
  windSpeed?: number;
  country?: string;
  time?: string;
  date?: string;
  isDay: boolean;
}

export interface ErrorResponse {
  error: string;
}
