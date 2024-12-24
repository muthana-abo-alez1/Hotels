export const calculateDaysBetweenDates = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(diffInTime / (1000 * 3600 * 24)));
  };
  