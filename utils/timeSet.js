const relativeTime = (date, time) => {
    const notificationTime = new Date(date.split('-').reverse().join('-') + 'T' + time);
    const currentTime = new Date();
    const timeDifference = currentTime - notificationTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return days + 'days ago';
    } else if (hours > 0) {
        return hours + 'hours ago';
    } else if (minutes > 1) {
        return minutes + 'm ago';
    } else {
        return 'just now';
    }
};