import headerImage from "../assets/header-image.jpeg";
import styles from "./header-image.module.scss";

export const HeaderImage = () => {
  return (
    <div
      className={styles.headerImage}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(9,9,11,0) 0%, rgba(9,9,11,1) 100%), url(${headerImage})`,
      }}
    ></div>
  );
};
