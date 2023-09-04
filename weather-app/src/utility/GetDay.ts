const date: Date = new Date();

const day = date.getDay();
const month = date.getMonth();

const daysText: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
]

const monthText: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Nov',
    'Dec',
]

export const currentDay = daysText[day];
export const dayNumber = date.getDate();
export const currentMonth = monthText[month];