import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IconProfile, IconHome } from "./icons";
import styles from "./navbar.module.scss";

export const NavBar = ({ className, userId }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/home`);
  };

  const handleProfileClick = () => {
    navigate(`/home`);
  };

  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={handleHomeClick}>
          <IconHome />
        </li>
        <li className={styles.li} onClick={handleProfileClick}>
          <IconProfile />
        </li>
      </ul>
    </nav>
  );
};
