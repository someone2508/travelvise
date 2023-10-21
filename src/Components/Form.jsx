import { useState } from "react";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import Button from "./Button";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import useUrlPosition from "../Hooks/useUrlPositions";
import { useEffect } from "react";
import Message from "./Message";

import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function Form() {
  const { isLoading, createCity } = useCities();

  const [lat, lng] = useUrlPosition();

  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeoLocation(true);
        setError("");

        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const cityObj = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    console.log("created cityObj, ", JSON.stringify(cityObj));

    await createCity(cityObj);

    console.log("Added city in file");

    navigate("/app/cities");
  }

  if (isLoadingGeoLocation) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label>City Name</label>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label>When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label>Notes about your trip to {cityName}</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
