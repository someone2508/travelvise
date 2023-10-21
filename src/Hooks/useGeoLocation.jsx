import { useState } from "react";

export default function useGeoLocation(defaultValue = null) {
  const [isLoading, setLoading] = useState(false);
  const [position, setPosition] = useState(defaultValue);
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support gelocation");

    setLoading(true);

    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });

      setLoading(false);
    });

    // if(error) {

    // }
  }

  return { isLoading, position, error, getPosition };
}
