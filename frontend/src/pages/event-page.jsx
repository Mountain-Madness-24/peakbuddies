import { useState, useEffect } from "react";
import axios from "axios";
import { PageLayout, NavBar, Avatar, HeaderImage } from "../components";
import { IconPeople } from "../components/icons";
import { useParams } from "react-router-dom"; // Import useParams

import globalStyles from "../globals.module.scss";
import styles from "./event-page.module.scss";

export const EventPage = () => {
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 5,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
  ]);
  const [eventName, setEventName] = useState(""); // State for event name
  const { id } = useParams(); // Extract the event ID from the URL parameters

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Adjust the URL as necessary to match your backend endpoint
        // Note: Using POST method as defined in your backend
        const response = await axios.post(
          "http://localhost:3000/event/getEvent",
          { eventId: id }, // Pass event ID in the request body
          { withCredentials: true }
        );
        console.log(response.data); // Log the event object
        setEventName(response.data.nameOfEvent); // Update the event name state
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]); // Dependency on `id` ensures this effect runs when the event ID changes

  return (
    <PageLayout header={<HeaderImage />}>
      <NavBar className={styles.navBar} />
      <article className={styles.title}>
        <p className={globalStyles.subtitle}>Mar 23 - 24</p>
        <h1>{eventName || "Loading event..."}</h1> {/* Use the eventName state here */}
        <span className={styles.joinedTag}>You've Joined</span>
      </article>
      <article>
        <span className={styles.participantsTag}>
          <IconPeople />
          {participants.length} People to Connect With
        </span>
        <section className={styles.participantGrid}>
          {participants.map(({ id, avatar }, index) => (
            <a key={id || index}>
              <Avatar src={avatar} />
            </a>
          ))}
        </section>
      </article>
    </PageLayout>
  );
};
