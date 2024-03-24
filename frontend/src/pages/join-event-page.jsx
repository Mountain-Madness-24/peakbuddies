import { PageLayout, HeaderImage, Button, FormField } from "../components";
import {
  IconOnboardingStep1,
  IconOnboardingStep2,
  IconOnboardingStep3,
} from "../components/icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

import styles from "./onboarding-page.module.scss";
import globalStyles from "../globals.module.scss";
import { redirect, useParams } from "react-router-dom";
import axios from "axios";

export const JoinEventPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { eventId } = event.target;

    try {
      const res = await axios.post(
        "http://localhost:3000/event/joinEvent",
        {
          eventId: eventId.value,
        },
        { withCredentials: true }
      );
      console.log(res);
      navigate(`/home`);
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <PageLayout
      header={<HeaderImage height={200} />}
      className={styles.onboardingPage}
      buttons={
        <>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <h1>Join an Event</h1>
        <FormField label="Code" type="text" name="eventId" />
        <Button type="submit">Join Event</Button>
      </form>
    </PageLayout>
  );
};
