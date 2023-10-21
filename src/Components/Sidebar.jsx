import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* AppNavbar */}
      <AppNavbar />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by travelwise Inc.
        </p>
      </footer>
    </div>
  );
}
