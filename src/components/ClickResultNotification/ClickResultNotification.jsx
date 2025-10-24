import styles from "./ClickResultNotification.module.css";

function ClickResultNotification({ clickResult }) {
  return clickResult.success ? (
    <p className={styles.notification}>{clickResult.name} found</p>
  ) : (
    <p className={styles.notification}>{clickResult.name} not found</p>
  );
}

export default ClickResultNotification;
