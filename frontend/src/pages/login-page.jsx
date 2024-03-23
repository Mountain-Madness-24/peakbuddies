import React from "react";
import LinkedInButton from "../components/linkedin-button";
import background from "../assets/background.png";
import styles from "./login-page.module.scss";

const LoginPage = () => (
  <div
    className={styles.loginPage}
    style={{ backgroundImage: `url(${background})` }}
  >
    <div className={styles.loginContainer}>
      <h1>Peak Buddies</h1>
      <p>CONNECT WITH YOUR HACKATHON COMMUNITY IN REAL TIME</p>
      <div className={styles.buttonWrapper}>
        <LinkedInButton />
      </div>
    </div>
  </div>
);

export default LoginPage;
