import styles from "./button.module.scss";

export const Button = ({ children, variant, icon }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {icon}
      {children}
    </button>
  );
};
