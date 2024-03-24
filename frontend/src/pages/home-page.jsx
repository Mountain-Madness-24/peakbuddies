import React from "react";
import { PageLayout, Button, HeaderImage, NavBar } from "../components/";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./home-page.module.scss";

export const HomePage = () => {
  const events = [
    { name: 'Mountain Madness 2024', path: '/event/mountain-madness' },
    { name: 'ChaosHacks 2024', path: '/event/chaoshacks' }
  ];

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
            <Link to={event.path} key={index} className={styles.eventItem}>
              {event.name}
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
