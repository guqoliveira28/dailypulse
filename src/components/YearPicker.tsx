import "./YearPicker.scss";

export default function YearPicker({
  currentYear,
  valueChanged,
}: {
  currentYear: number;
  valueChanged: Function;
}) {
  let years = [2023, 2024];
  return (
    <div className="year-select">
      <select value={currentYear} onChange={(event) => valueChanged(event)}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
