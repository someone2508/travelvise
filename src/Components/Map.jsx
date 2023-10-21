import { useEffect } from "react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

import useUrlPosition from "../Hooks/useUrlPositions";

import styles from "./Map.module.css";

import useGeoLocation from "../Hooks/useGeoLocation";
import Button from "./Button";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [mapLat, mapLng] = useUrlPosition();

  console.log(mapLat, mapLng);

  const {
    error,
    getPosition,
    isLoading,
    position: yourPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (!yourPosition?.lat && !yourPosition?.lng) return;
    setMapPosition([yourPosition.lat, yourPosition.lng]);
  }, [yourPosition]);

  return (
    <div className={styles.mapContainer}>
      {!yourPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          // if (!city?.position?.lat || city.position.lng) return;
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position); // [lat, lng];
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
