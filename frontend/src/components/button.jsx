import styles from "./button.module.scss";

export const Button = ({
  children,
  variant,
  icon,
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
      type={type}
    >
      {icon}
      {children}
    </button>
  );
};
