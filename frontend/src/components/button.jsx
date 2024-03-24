import styles from "./button.module.scss";

export const Button = ({ children, variant, icon, onClick }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[variant]}`}>
      {icon}
      {children}
    </button>
  );
};
