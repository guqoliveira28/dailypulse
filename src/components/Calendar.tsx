import { useState } from "react";
import "./Calendar.scss";
import MonthPicker from "./MonthPicker";
import DayPulse from "./DayPulse";
import { createCalendarArray } from "../scripts/calendar";

type pulseDay = {
  dayNumber: number;
  things: any[];
};

const numberOfColumns = 5;

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let newDate = new Date(
      currentDate.getFullYear() + "-" + (+event.target.value + 1) + "-01"
    );
    setCurrentDate(newDate);
  }

  const daysOfMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const calendarArray = createCalendarArray(daysOfMonth, numberOfColumns);

  return (
    <div className="calendar">
      <DayPulse />
      <MonthPicker
        currentMonth={currentDate.getMonth()}
        valueChanged={handleMonthChange}
      />
      <table>
        <tbody>
          {calendarArray.map((row, index) => (
            <tr key={index}>
              {row.map((day: Nullable<pulseDay>, dayIndex) => (
                <td key={dayIndex}>
                  <div className="cell-head"></div>
                  <p>{day?.dayNumber}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
