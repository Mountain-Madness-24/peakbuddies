import { useState, useEffect } from "react";
import axios from "axios";
import { PageLayout, NavBar, Avatar, HeaderImage, Button } from "../components";
import { IconSchool, IconWork } from "../components/icons";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

import globalStyles from "../globals.module.scss";
import styles from "./profile-page.module.scss";

export const ProfilePage = () => {
  const [user, setUser] = useState(); // State for event name
  const { id } = useParams(); // Extract the event ID from the URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Adjust the URL as necessary to match your backend endpoint
        // Note: Using POST method as defined in your backend
        const response = await axios.get(
          `${apiUrl}/user//getuser/${id}`,
          { withCredentials: true }
        );
        console.log(response.data); // Log the event object
        setUser(response.data); // Update the event name state
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]); // Dependency on `id` ensures this effect runs when the event ID changes

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <PageLayout
      includeNav
      header={<HeaderImage />}
      buttons={
        <Button variant="secondary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
      className={styles.profilePage}
    >
      <Avatar id={id} />
      <h1>
        {user?.firstName} {user?.lastName}
      </h1>
      <section>
        <h2 className={globalStyles.subtitle}>Linkedin info</h2>
        <section className={styles.info}>
          <div>
            <IconSchool />
            <p>{user?.school}</p>
          </div>
          <div>
            <IconWork />
            <p>{user?.recentExperience}</p>
          </div>
        </section>
      </section>
    </PageLayout>
  );
};
