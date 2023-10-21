import Sidebar from "../Components/Sidebar";
import Map from "../Components/Map";
import User from "../Components/User";

import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAP */}
      <Map />

      {/* USERS NAVBAR */}
      <User />
    </div>
  );
}
