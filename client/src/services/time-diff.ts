export const formatTimeSincePosted = (createdAt: Date): string => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days >= 1) {
        if (days < 2) {
            return 'a day ago';
        }
        return `${days} days ago`;
    } else if (hours >= 1) {
        if (hours < 2) {
            return 'an hour ago';
        }
        return `${hours} hours ago`;
    } else if (minutes >= 1) {
        if (minutes < 2) {
            return 'a minute ago';
        }
        return `${minutes} minutes ago`;
    } else {
        return 'Just now';
    }
};