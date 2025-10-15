import styles from "./Marker.module.css";

function Marker({ left, top }) {
  return (
    <div
      className={styles.marker}
      style={{ left: `${left}%`, top: `${top}%` }}
    ></div>
  );
}

export default Marker;
