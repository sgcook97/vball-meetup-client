import { format } from 'date-fns';

export function formatDateArray(dates: Date[]): string[] {
    return dates.map(date => format(date, "EEE MMM dd HH:mm:ss"));
}