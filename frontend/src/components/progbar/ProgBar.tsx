import styles from "./ProgBar.module.css";

export const ProgBar = () => {
  return (
    <>
      <div className={styles.progBar}>
        <p className={styles.bar}></p>
      </div>
    </>
  );
};
