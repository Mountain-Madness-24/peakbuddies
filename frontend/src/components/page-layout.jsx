import styles from "./page-layout.module.scss";

export const PageLayout = ({ children, header, buttons, className }) => {
  return (
    <div className={`${styles.pageLayout} ${className}`}>
      {header && <header>{header}</header>}
      <main>{children}</main>
      {buttons && <footer>{buttons}</footer>}
    </div>
  );
};
