function createCalendarArray(
  daysOfMonth: number,
  numberOfColumns: number
): Array<Array<Nullable<pulseDay>>> {
  const calendarArray = new Array<Array<Nullable<pulseDay>>>();
  let dayCount = 1;
  for (let i: number = 0; dayCount <= daysOfMonth; i++) {
    calendarArray.push(new Array<Nullable<pulseDay>>(numberOfColumns));
    for (let j: number = 0; j < numberOfColumns; j++) {
      if (dayCount <= daysOfMonth) {
        calendarArray[i].push({ dayNumber: dayCount++, things: [] });
      }
    }
  }
  return calendarArray;
}

export { createCalendarArray };
