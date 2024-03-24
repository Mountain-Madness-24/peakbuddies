import React, { useEffect, useState } from "react";
import axios from "axios";
import { PageLayout, Button, HeaderImage, NavBar } from "../components/";
import { Link, useParams  } from "react-router-dom";
import styles from "./home-page.module.scss";

export const HomePage = () => {
  const [events, setEvents] = useState([]); // Initialize events state
  const { id } = useParams(); // Extract the user ID from the URL parameters

  useEffect(() => {
    // Function to fetch events
    const fetchEvents = async () => {
      try {
        // Adjust the request URL as needed to match your backend endpoint
        const response = await axios.get(
          "http://localhost:3000/event/getEvents",
          {
            withCredentials: true, // Necessary for sessions to work across domains
          }
        );
        setEvents(response.data); // Set fetched events to state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <PageLayout
      header={<HeaderImage />}
      buttons={
        <>
          <Button variant="primary">Join Event</Button>
          <Button variant="secondary">Create Event</Button>
        </>
      }
    >
      <NavBar userId={id} className={styles.navBar} />
      <div className={styles.homePage}>
        <h1>YOUR EVENTS</h1>
        <div className={styles.eventList}>
          {events.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className={styles.eventItem}
            >
              {event.nameOfEvent}
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
