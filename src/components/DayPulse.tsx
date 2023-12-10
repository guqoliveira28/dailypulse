import "./DayPulse.scss";

export default function DayPulse({
  pulse,
  close,
}: {
  pulse: any;
  close: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <dialog className="pulse-modal" open>
      <p>Hello Wold</p>
      <form method="dialog">
        <button onClick={close}>Close</button>
      </form>
    </dialog>
  );
}
