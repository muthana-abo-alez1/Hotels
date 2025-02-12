export const calculateDaysBetweenDates = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffInTime = end.getTime() - start.getTime();
    const daysDifference = diffInTime / (1000 * 3600 * 24);
    if (daysDifference === 0) {return 1;}
    return Math.floor(daysDifference);
};
