import React, { useEffect } from "react";
import axios from "axios";
import { PageLayout, Button, HeaderImage } from "../components";
import { IconLinkedIn, IconLogo } from "../components/icons";
import globalStyles from "../globals.module.scss";
import styles from "./login-page.module.scss";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  // Define checkAuthentication as a standalone function that both useEffect and handleLogin can call
  const checkAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/protected", {
        withCredentials: true,
      });
      const data = response.data;
      if (response.status === 200 && data.user) {
        window.localStorage.setItem("userId", data.user); // Store the userId in localStorage
        navigate(`/onboarding/${data.user}`);
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  };

  useEffect(() => {
    // Use the checkAuthentication function here
    checkAuthentication();
  }, [navigate]);

  const handleLogin = () => {
    const loginWindow = window.open(
      "http://localhost:3000/auth/linkedin",
      "Login with LinkedIn",
      "width=800,height=600"
    );

    // Polling to check if the popup window is closed
    const pollLogin = setInterval(() => {
      if (loginWindow.closed) {
        clearInterval(pollLogin);
        // Re-check authentication status after the popup closes using the same checkAuthentication function
        checkAuthentication();
      }
    }, 100);
  };

  return (
    <PageLayout header={<HeaderImage height={336} />}>
      <div className={styles.loginPage}>
        <IconLogo />
        <h1>Peak Buddies</h1>
        <p className={globalStyles.subtitle}>
          Connect with your hackathon community in real time
        </p>
        <Button onClick={handleLogin}>
          <IconLinkedIn />
          Login with LinkedIn
        </Button>
      </div>
    </PageLayout>
  );
};
