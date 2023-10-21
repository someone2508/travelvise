import { useCities } from "../contexts/CitiesContext";

import styles from "./CountryList.module.css";
import CountryItem from "./CoutryItem";

export default function CountryList() {
  const { cities } = useCities();

  const countries = cities.reduce((arr, city) => {
    // {spane, paris, spane, india}
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []); // arr = [spane, paris, india];

  return (
    <ul className={styles.countryList}>
      {countries.map((c) => {
        return <CountryItem country={c} key={c.country} />;
      })}
    </ul>
  );
}
