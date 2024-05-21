import { fetchWeatherApi } from 'openmeteo';
import { formatDateArray } from './format-dates';

const OPEN_METEO_API_URL = import.meta.env.VITE_OPEN_METEO_API_URL as string;

const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export async function fetchWeather(latitude: number, longitude: number) {

    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "temperature_unit": "fahrenheit",
        "timezone": "auto",
        "hourly": [
            "temperature_2m",
            "precipitation_probability",
            "weather_code",
            "is_day",
        ],
        "forecast_days": 1,
    };

    try {
        const responses = await fetchWeatherApi(OPEN_METEO_API_URL, params);

        const response = responses[0];
        // const utcOffsetSeconds = response.utcOffsetSeconds();
        // const timezone = response.timezone();
        // const timezoneAbbreviation = response.timezoneAbbreviation();
        // const latitude = response.latitude();
        // const longitude = response.longitude();

        

        const hourly = response.hourly()!;

        const weatherData = {
            times: formatDateArray(range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t) * 1000)
            )),
            temps: hourly.variables(0)!.valuesArray()!,
            rainChance: hourly.variables(1)!.valuesArray()!,
            weatherCode: hourly.variables(2)!.valuesArray()!,
            daylight: hourly.variables(3)!.valuesArray()!,
        };

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}