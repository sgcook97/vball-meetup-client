import { fetchWeatherApi } from 'openmeteo';
import { format } from 'date-fns';

const OPEN_METEO_API_URL = import.meta.env.VITE_OPEN_METEO_API_URL as string;

const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export async function fetchWeather(latitude: number, longitude: number, n_hours: number = 1) {

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
        "forecast_days": 2,
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
            times: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t) * 1000)
            ),
            temps: hourly.variables(0)!.valuesArray()!,
            rainChance: hourly.variables(1)!.valuesArray()!,
            weatherCode: hourly.variables(2)!.valuesArray()!,
            daylight: hourly.variables(3)!.valuesArray()!,
        };

        return getWeatherForNextNHours(weatherData, n_hours);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// function to only return weather data for the next n hours
function getWeatherForNextNHours(weatherData: any, n_hours: number = 1) {
    const now = new Date();

    const times = weatherData.times;
    const temps = weatherData.temps;
    const rainChance = weatherData.rainChance;
    const weatherCode = weatherData.weatherCode;
    const daylight = weatherData.daylight;

    const timesForRestOfDay: Date[] = [];
    const tempsForRestOfDay: number[] = [];
    const rainChanceForRestOfDay: number[] = [];
    const weatherCodeForRestOfDay: number[] = [];
    const daylightForRestOfDay: number[] = [];

    const startingIndex = times.findIndex((time: Date) => time.getHours() === now.getHours());

    for (let i = startingIndex; i < startingIndex + n_hours; i++) {
        timesForRestOfDay.push(times[i]);
        tempsForRestOfDay.push(temps[i]);
        rainChanceForRestOfDay.push(rainChance[i]);
        weatherCodeForRestOfDay.push(weatherCode[i]);
        daylightForRestOfDay.push(daylight[i]);
    }

    return {
        times: formatDateArray(timesForRestOfDay),
        temps: tempsForRestOfDay,
        rainChance: rainChanceForRestOfDay,
        weatherCode: weatherCodeForRestOfDay,
        daylight: daylightForRestOfDay,
    };
}

function formatDateArray(dates: Date[]): string[] {
    return dates.map(date => splitTimeFormat(format(date, "ha")));
}

function splitTimeFormat(timeString: string): string {
    const match = timeString.match(/^(\d+)([AP]M)$/);
    if (match) {
        const [, hour, period] = match;
        return `${hour} ${period}`;
    }
    throw new Error('Invalid time format');
}
// function to format array of dates with times to hour with space followed by am/pm, e.g. 1 pm


