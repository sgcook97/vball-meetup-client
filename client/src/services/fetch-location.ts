import axios from 'axios';

export async function fetchLocation(latitude: number, longitude: number) {
    const NOMINATIM_API_URL = import.meta.env.VITE_NOMINATIM_API_URL;
    const url = `${NOMINATIM_API_URL}/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const city = data.address.city || data.address.town || data.address.village || null;
        const state = data.address.state || data.address.county || null;

        if (city && state) {
            return city + ', ' + state;
        } else if (city) {
            return city;
        } else if (state) {
            return state;
        }
        return null;

    } catch (error) {
        console.error('Error fetching city from coordinates:', error);
        throw error;
    }
}