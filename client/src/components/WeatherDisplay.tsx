import { useEffect, useState } from 'react';
import { fetchWeather } from '../services/fetch-weather';

interface WeatherData {
    times: String[],
    temps: Float32Array,
    rainChance: Float32Array,
    weatherCode: Float32Array,
    daylight: Float32Array,
}

export default function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather(30.435545, -97.622033); // Example coordinates for Tokyo
                setWeatherData(data);
                console.log(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch weather data');
                setLoading(false);
            }
        };

        getWeather();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const arrayLength = weatherData?.times.length || 0;

    return (
        <div>
            <h1>Weather Data</h1>
            {/* Map over the arrays simultaneously */}
            {[...Array(arrayLength)].map((_, index) => (
                <div className='my-4' key={index}>
                    <p>Time: {weatherData?.times[index]}</p>
                    <p>Temperature: {weatherData?.temps[index]}</p>
                    <p>Rain Chance: {weatherData?.rainChance[index]}</p>
                    <p>Weather Code: {weatherData?.weatherCode[index]}</p>
                    <p>Daylight: {weatherData?.daylight[index] === 0 ? 'No' : 'Yes'}</p>
                </div>
            ))}
        </div>
    );
};