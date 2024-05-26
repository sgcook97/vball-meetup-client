export const skillLevels = [
    'AA/Open',
    'A',
    'BB',
    'B',
    'C'
] as const;

export const weatherCodes = {
    0: {
        condition: 'Clear',
        icon: 'clear',
    },
    1: {
        condition: 'Mainly Clear',
        icon: 'partlyCloudy',
    },
    2: {
        condition: 'Partly Cloudy',
        icon: 'partlyCloudy',
    },
    3: {
        condition: 'Overcast',
        icon: 'cloudy',
    },
    45: {
        condition: 'Fog',
        icon: 'fog',
    },
    48: {
        condition: 'Rime Fog',
        icon: 'fog',
    },
    51: {
        condition: 'Light Drizzle',
        icon: 'rain',
    },
    53: {
        condition: 'Moderate Drizzle',
        icon: 'rain',
    },
    55: {
        condition: 'Heavy Drizzle',
        icon: 'heavyRain',
    },
    56: {
        condition: 'Light Freezing Drizzle',
        icon: 'freezingRain',
    },
    57: {
        condition: 'Heavy Freezing Drizzle',
        icon: 'heavyFreezingRain',
    },
    61: {
        condition: 'Light Rain',
        icon: 'rain',
    },
    63: {
        condition: 'Moderate Rain',
        icon: 'rain',
    },
    65: {
        condition: 'Heavy Rain',
        icon: 'heavyRain',
    },
    66: {
        condition: 'Light Freezing Rain',
        icon: 'freezingRain',
    },
    67: {
        condition: 'Heavy Freezing Rain',
        icon: 'heavyFreezingRain',
    },
    71: {
        condition: 'Light Snow Fall',
        icon: 'snow',
    },
    73: {
        condition: 'Moderate Snow Fall',
        icon: 'snow',
    },
    75: {
        condition: 'Heavy Snow Fall',
        icon: 'heavySnow',
    },
    77: {
        condition: 'Snow Grains',
        icon: 'snow',
    },
    80: {
        condition: 'Light Rain Showers',
        icon: 'rain',
    },
    81: {
        condition: 'Moderate Rain Showers',
        icon: 'rain',
    },
    82: {
        condition: 'Heavy Rain Showers',
        icon: 'heavyRain',
    },
    85: {
        condition: 'Light Snow Showers',
        icon: 'snow',
    },
    86: {
        condition: 'Heavy Snow Showers',
        icon: 'heavySnow',
    },
    95: {
        condition: 'Thunderstorm',
        icon: 'cloudy',
    },
    96: {
        condition: 'Thunderstorm Light Hail',
        icon: 'cloudy',
    },
    99: {
        condition: 'Thunderstorm Heavy Hail',
        icon: 'cloudy',
    },
} as const;