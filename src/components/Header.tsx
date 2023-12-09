import "./Header.scss";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="DailyPulse logo" />
    </header>
  );
}
