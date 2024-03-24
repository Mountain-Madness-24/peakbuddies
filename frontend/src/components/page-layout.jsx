import styles from "./page-layout.module.scss";
import { NavBar } from "./navbar";

export const PageLayout = ({
  children,
  header,
  buttons,
  className,
  includeNav = false,
}) => {
  return (
    <div className={`${styles.pageLayout} ${className}`}>
      {header && <header>{header}</header>}
      {includeNav && <NavBar />}
      <main>{children}</main>
      {buttons && <footer>{buttons}</footer>}
    </div>
  );
};
