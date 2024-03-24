import React, { useEffect, useState } from "react";
import axios from 'axios';
import { PageLayout, Button, HeaderImage, NavBar } from "../components/";
import { Link, useParams } from "react-router-dom"; // Import useParams from react-router-dom
import styles from "./home-page.module.scss";

export const HomePage = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const [events, setEvents] = useState([]); // Initialize events state

  useEffect(() => {
    // Define the function to fetch events
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/event/getEvents', {
          withCredentials: true, 
        });
        setEvents(response.data); 
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); 
  }, [id]); 

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
      <NavBar className={styles.navBar} />
      <div className={styles.homePage}>
        <h1>YOUR EVENTS</h1>
        <div className={styles.eventList}>
          {events.map((event, index) => (
            <Link to={`/event/${event._id}`} key={index} className={styles.eventItem}>
              {event.nameOfEvent}
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
