import React from "react";
import LinkedInButton from "../components/linkedin-button";
import background from "../assets/background.png";
import styles from "./login-page.module.scss";
import { PageLayout } from "../components/page-layout";
import { Button } from "../components/button";
import { IconLinkedIn, IconLogo } from "../components/icons";
import { HeaderImage } from "../components/header-image";

const LoginPage = () => (
  <PageLayout header={<HeaderImage />}>
    <div className={styles.loginPage}>
      <IconLogo />
      <h1>Peak Buddies</h1>
      <p className={styles.subtitle}>
        Connect with your hackathon
        <br />
        community in real time
      </p>
      <Button>
        <IconLinkedIn />
        Login with LinkedIn
      </Button>
    </div>
  </PageLayout>
  // <div
  //   className={styles.loginPage}
  //   style={{ backgroundImage: `url(${background})` }}
  // >
  //   <div className={styles.loginContainer}>
  //     <h1>Peak Buddies</h1>
  //     <p>CONNECT WITH YOUR HACKATHON COMMUNITY IN REAL TIME</p>
  //     <div className={styles.buttonWrapper}>
  //       <LinkedInButton />
  //     </div>
  //   </div>
  // </div>
);

export default LoginPage;
