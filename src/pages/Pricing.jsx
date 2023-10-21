import Navbar from "../Components/Navbar";
import styles from "./Product.module.css";

export default function Pricing() {
  return (
    <div className={styles.product}>
      {/* Navbar */}
      <Navbar />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city" />
      </section>
    </div>
  );
}
