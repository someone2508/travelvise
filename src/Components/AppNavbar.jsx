import { NavLink } from "react-router-dom";
import styles from "./AppNavbar.module.css";

export default function AppNavbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Coutiries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
