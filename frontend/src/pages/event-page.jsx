import { useState, useEffect } from "react";
import axios from "axios";
import { PageLayout, NavBar, Avatar, HeaderImage } from "../components";
import { IconPeople } from "../components/icons";
import { useParams } from "react-router-dom"; // Import useParams
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

import globalStyles from "../globals.module.scss";
import styles from "./event-page.module.scss";

export const EventPage = () => {
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState(""); // State for event name
  const { id } = useParams(); // Extract the event ID from the URL parameters

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Adjust the URL as necessary to match your backend endpoint
        // Note: Using POST method as defined in your backend
        const response = await axios.post(
          `${apiUrl}/event/getEvent`,
          { eventId: id }, // Pass event ID in the request body
          { withCredentials: true }
        );
        console.log(response.data); // Log the event object
        setEventName(response.data.nameOfEvent); // Update the event name state
        setParticipants(response.data.participants); // Update the participants state
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]); // Dependency on `id` ensures this effect runs when the event ID changes

  return (
    <PageLayout includeNav header={<HeaderImage />}>
      <article className={styles.title}>
        <p className={globalStyles.subtitle}>Mar 23 - 24</p>
        <h1>{eventName || "Loading event..."}</h1>{" "}
        {/* Use the eventName state here */}
        <span className={styles.joinedTag}>You've Joined</span>
      </article>
      <article>
        <span className={styles.participantsTag}>
          <IconPeople />
          {participants.length} People to Connect With
        </span>
        <section className={styles.participantGrid}>
          {participants.map((id, index) => (
            <a key={id || index} href={`/profile/${id}`}>
              <Avatar id={id} />
            </a>
          ))}
        </section>
      </article>
    </PageLayout>
  );
};
