function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getDaysOfTheWeek(): String[] {
  let arrayDOTW: String[] = new Array<String>();
  for (let i = 0; i < 7; i++) {
    // first january 2024 is a mondey
    arrayDOTW.push(
      new Date(2024, 0, i + 1).toLocaleString("default", { weekday: "long" })
    );
  }
  return arrayDOTW;
}

function createCalendarArray(
  recievedDate: Date,
  dayEntries: DayEntry[]
): Array<Array<Nullable<DayEntry>>> {
  const calendarArray = new Array<Array<Nullable<DayEntry>>>();
  const currentDate: Date = new Date(
    recievedDate.getFullYear(),
    recievedDate.getMonth()
  );
  const numberOfColumns: number = 7;
  const daysOfMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  let dayCount: number = 1;
  let startTable: boolean = false;

  // Sunday - Saturday : 0 - 6
  let startCol: number = currentDate.getDay() - 1;
  if (startCol < 0) {
    startCol = numberOfColumns - 1;
  }

  for (let i: number = 0; dayCount <= daysOfMonth; i++) {
    calendarArray.push(new Array<Nullable<DayEntry>>(numberOfColumns));
    for (let j: number = 0; j < numberOfColumns; j++) {
      if (j === startCol) {
        startTable = true;
      } else if (!startTable) {
        calendarArray[i].push(null);
      }
      if (startTable && dayCount <= daysOfMonth) {
        const date: Date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          dayCount++
        );
        const dayEntry: DayEntry | undefined = dayEntries.find(
          (day) => day.date.getTime() === date.getTime()
        );
        let pulses: Pulse[] = [];
        if (dayEntry) {
          pulses = dayEntry.pulses;
        }
        calendarArray[i].push({
          date: date,
          pulses: pulses,
          id: date.getTime(),
        });
      }
    }
  }
  return calendarArray;
}

export { createCalendarArray, getDaysOfTheWeek };
