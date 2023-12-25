import { useRef, useState } from "react";
import "./Calendar.scss";
import MonthPicker from "./MonthPicker";
import DayPulse, { ModalHandle } from "./DayPulse";
import { createCalendarArray } from "../scripts/calendar";
import YearPicker from "./YearPicker";

const numberOfColumns = 5;

export default function Calendar() {
  const modalRef: React.Ref<ModalHandle> = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPulse, setSelectedPulse] = useState<PulseDay>();

  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let newDate = new Date(
      currentDate.getFullYear() + "-" + (+event.target.value + 1) + "-01"
    );
    setCurrentDate(newDate);
  }

  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let newDate = new Date(
      event.target.value + "-" + (currentDate.getMonth() + 1) + "-01"
    );
    setCurrentDate(newDate);
  }

  function clearSelectedPulse() {
    setSelectedPulse(undefined);
  }

  const handleSelectedPulse = (pulse: Nullable<PulseDay>) => {
    if (pulse !== null) {
      setSelectedPulse(pulse);
      modalRef.current?.openModal();
    } else {
      console.error("Pulse was null!");
    }
    console.log(pulse);
  };

  const calendarArray = createCalendarArray(currentDate, numberOfColumns);

  return (
    <div className="calendar">
      <DayPulse
        ref={modalRef}
        pulse={selectedPulse!}
        close={clearSelectedPulse}
      />

      <div className="date-picker">
        <MonthPicker
          currentMonth={currentDate.getMonth()}
          valueChanged={handleMonthChange}
        />
        <YearPicker
          currentYear={currentDate.getFullYear()}
          valueChanged={handleYearChange}
        />
      </div>
      <table>
        <tbody>
          {calendarArray.map((row, index) => (
            <tr key={index}>
              {row.map((pulseDay: Nullable<PulseDay>, dayIndex) => {
                let day = pulseDay?.date.getDate();

                return (
                  <td
                    key={dayIndex}
                    onClick={() => handleSelectedPulse(pulseDay)}
                  >
                    <div className="cell-head"></div>
                    <p>{day}</p>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
