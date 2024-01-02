import { useRef, useState } from "react";
import "./Calendar.scss";
import MonthPicker from "./MonthPicker";
import DayEntryPopup, { ModalHandle } from "./DayEntryPopup";
import { createCalendarArray, getDaysOfTheWeek } from "../scripts/calendar";
import YearPicker from "./YearPicker";
import { dummyDayEntries, dummyPulses } from "../assets/dummydb";

export default function Calendar() {
  const modalRef: React.Ref<ModalHandle> = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Nullable<DayEntry>>(null);

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

  function clearSelectedDayEntry() {
    const dayEntriesIndex: number = dummyDayEntries.findIndex(
      (dayEntry: DayEntry) => dayEntry.id === selectedDay?.id
    );
    if (dayEntriesIndex < 0) {
      dummyDayEntries.push(selectedDay!);
    } else {
      dummyDayEntries[dayEntriesIndex] = { ...selectedDay! };
    }
    setSelectedDay(null);
  }

  const handleSelectedPulse = (pulse: Nullable<DayEntry>) => {
    if (pulse !== null) {
      setSelectedDay(pulse);
      modalRef.current?.openModal();
    } else {
      console.error("Pulse was null!");
    }
  };

  const handleAddPulse = (pulseId: number, dayPulse: DayEntry) => {
    const pulse: Pulse | undefined = dummyPulses.find(
      (dummy) => dummy.id === pulseId
    );
    if (pulse) {
      dayPulse.pulses.push(pulse);
      setSelectedDay({ ...dayPulse, pulses: [...dayPulse.pulses] });
    } else {
      console.error("Pulse was not found!");
    }
  };

  const handleRemovePulse = (pulseId: number, dayPulse: DayEntry) => {
    dayPulse.pulses = dayPulse.pulses.filter((p) => p.id !== pulseId);
    setSelectedDay({ ...dayPulse, pulses: [...dayPulse.pulses] });
  };

  const calendarArray = createCalendarArray(currentDate, dummyDayEntries);

  return (
    <div className="calendar">
      <DayEntryPopup
        ref={modalRef}
        currentDayEntry={selectedDay}
        close={clearSelectedDayEntry}
        addPulse={(selectedPulseId: number) =>
          handleAddPulse(selectedPulseId, selectedDay!)
        }
        removePulse={(selectedPulseId: number) =>
          handleRemovePulse(selectedPulseId, selectedDay!)
        }
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
        <thead>
          <tr>
            {getDaysOfTheWeek().map((row, index) => {
              return <th key={index}>{row}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {calendarArray.map((row, index) => (
            <tr key={index}>
              {row.map((dayEntry: Nullable<DayEntry>, dayIndex) => {
                let day = dayEntry?.date.getDate();
                if (!dayEntry) {
                  return <td className="empty" key={dayIndex}></td>;
                }

                return (
                  <td
                    key={dayIndex}
                    onClick={() => handleSelectedPulse(dayEntry)}
                  >
                    <div className="cell-head"></div>
                    <div className="pulses-color">
                      {dayEntry?.pulses.map((pulse) => (
                        <div
                          key={pulse.id}
                          style={{ backgroundColor: pulse.color }}
                        ></div>
                      ))}
                    </div>
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
