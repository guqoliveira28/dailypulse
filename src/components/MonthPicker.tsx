import "./MonthPicker.scss";

export default function MonthPicker({
  currentMonth,
  valueChanged,
}: {
  currentMonth: number;
  valueChanged: Function;
}) {
  let months = Array<String>();
  for (let i: number = 1; i <= 12; i++) {
    months.push(
      new Date("2023-" + i + "-01").toLocaleString("default", { month: "long" })
    );
  }
  return (
    <div className="month-select">
      <select value={currentMonth} onChange={(event) => valueChanged(event)}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}
