import { weatherCodes } from "../lib/data";
import { 
    WiDaySunny,
    WiSnow,
    WiNightClear,
    WiDayCloudy,
    WiNightAltCloudy,
    WiCloud,
    WiFog,
    WiShowers,
    WiRain,
    WiSleet,
    WiHail, 
} from "react-icons/wi";

interface WeatherIconProps {
    code: number;
    daytime: boolean;
    size: number;
}

export default function WeatherIcon({ code, daytime, size }: WeatherIconProps) {
    const weatherCode = weatherCodes[code as keyof typeof weatherCodes];

    switch (weatherCode?.icon) {
        case 'clear':
            if (daytime) {
                return <WiDaySunny size={size} />;
            }
            return <WiNightClear size={size} />;
        case 'partlyCloudy':
            if (daytime) {
                return <WiDayCloudy size={size} />;
            }
            return <WiNightAltCloudy size={size} />;
        case 'cloudy':
            return <WiCloud size={size} />;
        case 'fog':
            return <WiFog size={size} />;
        case 'rain':
            return <WiShowers size={size} />;
        case 'heavyRain':
            return <WiRain size={size} />;
        case 'freezingRain':
            return <WiSleet size={size} />;
        case 'heavyFreezingRain':
            return <WiHail size={size} />;
        case 'snow':
            return <WiSnow size={size} />;
        case 'heavySnow':
            return <WiSnow size={size} />;
        default:
            if (daytime) {
                return <WiDaySunny size={size} />;
            }
            return <WiNightClear size={size} />;
    }  
}