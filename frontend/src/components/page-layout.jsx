import styles from "./page-layout.module.scss";

export const PageLayout = ({ children, header, buttons }) => {
  return (
    <div className={styles.pageLayout}>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{buttons}</footer>
    </div>
  );
};
