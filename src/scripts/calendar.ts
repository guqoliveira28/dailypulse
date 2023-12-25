function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function createCalendarArray(
  currentDate: Date,
  numberOfColumns: number
): Array<Array<Nullable<PulseDay>>> {
  const calendarArray = new Array<Array<Nullable<PulseDay>>>();
  let dayCount = 1;
  const daysOfMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  for (let i: number = 0; dayCount <= daysOfMonth; i++) {
    calendarArray.push(new Array<Nullable<PulseDay>>(numberOfColumns));
    for (let j: number = 0; j < numberOfColumns; j++) {
      if (dayCount <= daysOfMonth) {
        let date: Date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          dayCount++
        );
        calendarArray[i].push({
          date: date,
          pulses: [],
          id: dayCount,
        });
      }
    }
  }
  return calendarArray;
}

export { createCalendarArray };
