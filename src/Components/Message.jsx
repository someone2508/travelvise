import styles from "./Message.module.css";

export default function Message({ message }) {
  return (
    <p>
      <span className={styles.message}>
        <span>👋 </span>
        {message}
      </span>
    </p>
  );
}
