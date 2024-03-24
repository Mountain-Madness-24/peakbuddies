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

const Step1 = () => {
  return (
    <>
      <h1>Welcome to PeakBuddies</h1>
      <article className={styles.step1Icons}>
        <section>
          <IconOnboardingStep1 />
          <p className={globalStyles.titleSmall}>
            Connect with your hackathon community
          </p>
        </section>
        <section>
          <IconOnboardingStep2 />
          <p className={globalStyles.titleSmall}>
            break the ice and meet others in 20 minutes
          </p>
        </section>
        <section>
          <IconOnboardingStep3 />
          <p className={globalStyles.titleSmall}>
            actually have meaningful linkedin connections
          </p>
        </section>
      </article>
    </>
  );
};

const Step2 = () => {
  return (
    <>
      <h1>Enter Your Info</h1>
    </>
  );
};

const Step3 = () => {
  const navigate = useNavigate();

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
    <>
      <form onSubmit={handleSubmit}>
        <h1>Join an Event</h1>
        <FormField label="Code" type="text" name="eventId" />
        <Button type="submit">Join Event</Button>
      </form>
    </>
  );
};

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((step) => step + 1);
  };

  const handleBack = () => {
    setCurrentStep((step) => step - 1);
  };

  const handleSkippingJoin = () => {
    navigate(`/home`);
  };

  return (
    <PageLayout
      header={<HeaderImage height={200} />}
      className={styles.onboardingPage}
      buttons={
        <>
          {currentStep !== 2 && <Button onClick={handleNext}>Next</Button>}
          {currentStep === 2 && (
            <Button variant="tetriary" onClick={handleSkippingJoin}>
              Skip
            </Button>
          )}
          {currentStep !== 0 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
        </>
      }
    >
      {currentStep === 0 && <Step1 />}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
    </PageLayout>
  );
};
