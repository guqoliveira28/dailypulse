import { forwardRef, useImperativeHandle, useRef } from "react";
import "./DayPulse.scss";

export type ModalHandle = {
  openModal: () => void;
};

const DayPulse = forwardRef<
  ModalHandle,
  {
    pulse: PulseDay;
    close: React.MouseEventHandler<HTMLButtonElement>;
  }
>(function DayPulse(
  {
    pulse,
    close,
  }: {
    pulse: PulseDay;
    close: React.MouseEventHandler<HTMLButtonElement>;
  },
  ref: React.Ref<ModalHandle>
) {
  const dialog: React.LegacyRef<HTMLDialogElement> =
    useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      openModal() {
        if (dialog?.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  return (
    <dialog ref={dialog} className="pulse-modal">
      <h2>Day {pulse?.date.toDateString()}</h2>
      <div>
        <section>
          <h3>Selected Pulses</h3>
        </section>
        <section>
          <h3>Avialable Pulses</h3>
        </section>
      </div>
      <form method="dialog">
        <button onClick={close}>Close</button>
      </form>
    </dialog>
  );
});

export default DayPulse;
