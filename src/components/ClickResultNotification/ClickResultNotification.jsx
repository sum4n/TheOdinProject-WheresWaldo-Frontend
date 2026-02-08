import styles from "./ClickResultNotification.module.css";

function ClickResultNotification({ clickResult }) {
  return clickResult.success ? (
    <p className={styles.notification}>{clickResult.characterName} found</p>
  ) : (
    <p className={styles.notification}>{clickResult.characterName} not found</p>
  );
}

export default ClickResultNotification;
