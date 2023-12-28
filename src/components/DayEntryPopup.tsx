import { forwardRef, useImperativeHandle, useRef } from "react";
import "./DayEntryPopup.scss";
import { dummyPulses } from "../assets/dummydb";

export type ModalHandle = {
  openModal: () => void;
};

function getAvailablePulses(dayPulsePulses: Pulse[]): Pulse[] {
  if (dayPulsePulses.length === 0) {
    return dummyPulses;
  }
  let availablePulsesList: Pulse[] = [];
  dummyPulses.forEach((dummy) => {
    if (!dayPulsePulses.find((p) => p.id === dummy.id)) {
      availablePulsesList.push(dummy);
    }
  });
  return availablePulsesList;
}

const DayEntryPopup = forwardRef<
  ModalHandle,
  {
    currentDayEntry: Nullable<DayEntry>;
    close: React.MouseEventHandler<HTMLButtonElement>;
    addPulse: Function;
    removePulse: Function;
  }
>(function DayEntryPopup(
  {
    currentDayEntry,
    close,
    addPulse,
    removePulse,
  }: {
    currentDayEntry: Nullable<DayEntry>;
    close: React.MouseEventHandler<HTMLButtonElement>;
    addPulse: Function;
    removePulse: Function;
  },
  ref: React.Ref<ModalHandle>
) {
  const dialog: React.LegacyRef<HTMLDialogElement> =
    useRef<HTMLDialogElement>(null);
  const availablePulses: Pulse[] = getAvailablePulses(
    currentDayEntry ? currentDayEntry.pulses : []
  );
  const dayLabel: string = currentDayEntry
    ? currentDayEntry.date.toLocaleString("default", { month: "long" }) +
      " " +
      currentDayEntry.date.getDate() +
      ", " +
      currentDayEntry.date.getFullYear()
    : "";

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        if (dialog?.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  const selectedPulses =
    currentDayEntry && currentDayEntry.pulses.length > 0 ? (
      <section>
        <h3>Selected Pulses</h3>
        <ul>
          {currentDayEntry?.pulses.map((pulse: Pulse) => (
            <li
              key={pulse.id}
              style={{ color: pulse.color, borderColor: pulse.color }}
              onClick={() => removePulse(pulse.id)}
            >
              {pulse.name}
            </li>
          ))}
        </ul>
      </section>
    ) : undefined;

  return (
    <dialog ref={dialog} className="pulse-modal">
      <h2>{dayLabel}</h2>
      <div className="pulses">
        {selectedPulses}
        <section>
          <h3>Avialable Pulses</h3>
          <ul>
            {availablePulses.map((pulse: Pulse) => (
              <li
                key={pulse.id}
                style={{ color: pulse.color, borderColor: pulse.color }}
                onClick={() => addPulse(pulse.id)}
              >
                {pulse.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <form method="dialog">
        <button onClick={close}>Close</button>
      </form>
    </dialog>
  );
});

export default DayEntryPopup;
