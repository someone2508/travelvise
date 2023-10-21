import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  // if (!position || !position.lat || !position.lng) return;

  const { deleteCity, currentCity } = useCities();

  function formatDate(date) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date)); // 12 October, 2023
  }

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id == currentCity.id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* emoji for flag */}
        <span className={styles.emoji}>{emoji}</span>

        {/* cityName */}
        <h3 className={styles.name}>{cityName}</h3>

        {/* date */}
        <time className={styles.date}>({formatDate(date)})</time>

        {/* delete city button */}
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
