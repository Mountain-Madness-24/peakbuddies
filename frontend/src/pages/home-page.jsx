// home-page.js
import React from "react";
import { PageLayout, Button, HeaderImage, NavBar } from "../components/";
import styles from "./home-page.module.scss";

export const HomePage = () => {
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
      <NavBar c />
      <div className={styles.homePage}>
        <h1 >YOUR EVENTS</h1>
      </div>
    </PageLayout>
  );
};
