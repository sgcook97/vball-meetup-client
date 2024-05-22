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

export default function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getWeather = async () => {
            try {
                navigator.geolocation.getCurrentPosition( async (position) => {
                    const weatherAPIResponse = await fetchWeather(position.coords.latitude, position.coords.longitude, 24);
                    const locationResponse = await fetchLocation(position.coords.latitude, position.coords.longitude);
                    setWeatherData(weatherAPIResponse);
                    setLocation(locationResponse);
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
            <p>{`${Math.round(weatherData?.temps[0] ?? 0)}°F`}</p>
            <p className='text-sm'>{location}</p>
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