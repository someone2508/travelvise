import Navbar from "../Components/Navbar";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <div className={styles.product}>
      {/* NavBar */}
      <Navbar />

      <section>
        <img src="img-1.jpg" alt="person having a dog" />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </div>
  );
}
