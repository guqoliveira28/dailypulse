import { forwardRef, useImperativeHandle, useRef } from "react";
import "./DayPulse.scss";

export type ModalHandle = {
  openModal: () => void;
};

const DayPulse = forwardRef<
  ModalHandle,
  { pulse: any; close: React.MouseEventHandler<HTMLButtonElement> }
>(function DayPulse(
  {
    pulse,
    close,
  }: {
    pulse: any;
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
      <p>Hello Wold</p>
      <form method="dialog">
        <button onClick={close}>Close</button>
      </form>
    </dialog>
  );
});

export default DayPulse;
