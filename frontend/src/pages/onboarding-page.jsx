import { PageLayout, HeaderImage, Button, FormField } from "../components";
import {
  IconOnboardingStep1,
  IconOnboardingStep2,
  IconOnboardingStep3,
} from "../components/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

import styles from "./onboarding-page.module.scss";
import globalStyles from "../globals.module.scss";
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

const Step2 = ({ userId }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/auth/protected `,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        if (response.status === 200 && data.user) {
          setName(`${data.userInfo.firstName} ${data.userInfo.lastName}`);
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    getUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { school, recentExperience } = event.target;

    try {
      const res = await axios.patch(
        `${apiUrl}/user/updateUser`,
        {
          school: school.value,
          recentExperience: recentExperience.value,
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
      <h1>Enter Your Info</h1>
      <form onSubmit={handleSubmit} className={styles.step2Form}>
        <h2>{name}</h2>
        <section className={styles.step2Fields}>
          <FormField label="School" type="text" name="school" />
          <FormField
            label="Recent Work Experience"
            type="text"
            name="recentExperience"
          />
        </section>
        <Button type="submit">Update Info</Button>
      </form>
    </>
  );
};

const Step3 = ({ userId }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { eventId } = event.target;

    try {
      const res = await axios.post(
        `${apiUrl}/event/joinEvent`,
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
  const { id } = useParams();

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
          {currentStep === 0 && <Button onClick={handleNext}>Next</Button>}
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
      {currentStep === 1 && <Step2 userId={id} />}
      {currentStep === 2 && <Step3 userId={id} />}
    </PageLayout>
  );
};
