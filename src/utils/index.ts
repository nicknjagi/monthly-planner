export const months: string[] = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'october', 'November', 'December']

export const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


export function getDaysInWeek(weekNumber: number): Array<{ date: number; day: string }> {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfWeek = new Date(firstDayOfMonth);
  firstDayOfWeek.setDate(firstDayOfMonth.getDate() + (weekNumber - 1) * 7 - firstDayOfMonth.getDay() + 1);
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  const daysArray: Array<{ date: number; day: string }> = [];
  for (let date = firstDayOfWeek; date <= lastDayOfWeek; date.setDate(date.getDate() + 1)) {
      // Check if the date is within the current month
      if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && date.getDay()!== 0) {
        const dayName = days[date.getDay()];
        daysArray.push({ date: date.getDate(), day: dayName });
    }
  }

  return daysArray;
}


export function getCurrentWeekInMonth(): number {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Calculate the current day of the month
    const currentDayOfMonth = today.getDate();

    // Calculate the current week within the month
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const currentWeek = Math.ceil((currentDayOfMonth + firstDayOfWeek) / 7);

    return currentWeek;
}


export function weeksInMonth(month: number): number {
  // Check if the month is January or February
  if (month === 0 || month === 1) {
      // January has 31 days, so 5 weeks
      // February has 28 days, so 4 weeks
      return month === 0? 5 : 4;
  } else {
      // For all other months, return 4 weeks plus one extra week if the month has more than 28 days
      return 4 + ((month > 1 && month < 7)? 1 : 0);
  }
}
