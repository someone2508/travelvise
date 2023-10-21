import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.homepage}>
      {/* NavBar */}
      <Navbar />

      <section>
        <h1>
          You travel the world. travelwise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </div>
  );
}
