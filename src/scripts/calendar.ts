function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function createCalendarArray(
  currentDate: Date,
  numberOfColumns: number,
  dayEntries: DayEntry[]
): Array<Array<Nullable<DayEntry>>> {
  const calendarArray = new Array<Array<Nullable<DayEntry>>>();
  let dayCount = 1;
  const daysOfMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  for (let i: number = 0; dayCount <= daysOfMonth; i++) {
    calendarArray.push(new Array<Nullable<DayEntry>>(numberOfColumns));
    for (let j: number = 0; j < numberOfColumns; j++) {
      if (dayCount <= daysOfMonth) {
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

export { createCalendarArray };
