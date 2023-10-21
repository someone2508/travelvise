import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";

import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CityList() {
  const { cities, isLoading } = useCities();

  // will add a spinner for loading
  if (isLoading) return <Spinner />;

  if (!cities.length) {
    // Message Component, (with no city record found message in it)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}
