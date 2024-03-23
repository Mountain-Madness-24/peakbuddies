import React from "react";
import linkedInLogo from '../assets/linkedin-logo.png';
import styles from './linkedin-button.module.scss';

const LinkedInButton = () => (
    <button className={styles.linkedinButton}>
      <img src={linkedInLogo} alt="LinkedIn logo" className={styles.logo} />
      Login with LinkedIn
    </button>
  );
  
  export default LinkedInButton;