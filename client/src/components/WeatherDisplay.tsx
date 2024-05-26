import { useEffect, useState } from 'react';
import { fetchWeather } from '../services/fetch-weather';
import WeatherIcon from './WeatherIcon';
import { fetchLocation } from '../services/fetch-location';
import WeatherSkeleton from './WeatherSkeleton';

interface WeatherData {
    times: string[],
    temps: number[],
    rainChance: number[],
    weatherCode: number[],
    daylight: number[],
}

function goodVolleyballWeather(temp: number, rainChance: number, weatherCode: number, daylight: number) {
    if (temp < 60 || temp > 95) {
        return false;
    }
    if (rainChance > 50) {
        return false;
    }
    if (weatherCode > 3 && weatherCode < 95) {
        return false;
    }
    if (daylight === 0) {
        return false;
    }
    return true;

}

export default function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [goodWeather, setGoodWeather] = useState<boolean>(false);


    useEffect(() => {
        const getWeather = async () => {
            try {
                navigator.geolocation.getCurrentPosition( async (position) => {
                    const weatherAPIResponse = await fetchWeather(position.coords.latitude, position.coords.longitude, 24);
                    const locationResponse = await fetchLocation(position.coords.latitude, position.coords.longitude);
                    setWeatherData(weatherAPIResponse);
                    setLocation(locationResponse);
                    setGoodWeather(goodVolleyballWeather(
                        weatherAPIResponse.temps[0], 
                        weatherAPIResponse.rainChance[0], 
                        weatherAPIResponse.weatherCode[0], 
                        weatherAPIResponse.daylight[0])
                    );
                    console.log(weatherAPIResponse);
                    setLoading(false);
                 }, (error) => { 
                    throw error;
                 });
            } catch (err) {
                setError('Failed to fetch weather data');
                setLoading(false);
            }
        };
        getWeather();
    }, []);

    const arrayLength = weatherData?.times.length || 0;

    if (loading) {
        return (
            <WeatherSkeleton />
        );
    };
    if (error) return <div>{error}</div>;

    return (
        <div className="py-4 bg-onSurface/5 text-onSurface flex flex-col w-full overflow-hidden
            rounded-lg border-2 border-onSurface/10 justify-center items-center">
            <WeatherIcon 
                code={weatherData?.weatherCode[0] ?? 0} 
                daytime={weatherData?.daylight[0] === 1}
                size={76}
            />
            <p className={`text-lg font-semibold mb-2 ${goodWeather ? 'text-primary' : 'text-error'}`}>
                {goodWeather ? 'Get out and play!' : weatherData?.daylight[0] === 0 ? "It's too dark to play." : 'The weather is not ideal to play.'}
            </p>
            <p>{`${Math.round(weatherData?.temps[0] ?? 0)}°F`}</p>
            <p className='text-sm'>{location}</p>
            <p className='text-xs mt-1'>Chance of Precipitation: {' ' + weatherData?.rainChance[0] + '%'}</p>
            <div className='flex overflow-auto w-full hide-scrollbar mt-6'>
                {[...Array(arrayLength)].map((_, index) => (
                    <div className='flex flex-col justify-center items-center m-1' key={index}>
                        <div className='flex justify-center items-end text-center'>
                            {index === 0 ? 
                                <p className='text-[12px] '>Now</p> 
                                :
                                <>
                                    <p className='text-sm'>{weatherData?.times[index].split(' ')[0]}</p>
                                    <p className='text-[10px] -translate-y-[1px]'>{weatherData?.times[index].split(' ')[1]}</p>
                                </> 
                            }
                        </div>
                        <WeatherIcon 
                            code={weatherData?.weatherCode[index] ?? 0}
                            daytime={weatherData?.daylight[index] === 1}
                            size={34}
                        />
                        <p className='text-sm'>{`${Math.round(weatherData?.temps[index] ?? 0)}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};