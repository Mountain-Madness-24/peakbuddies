import { PageLayout, Button, Avatar } from "../components";
import {
  IconIntro,
  IconIcebreaker,
  IconLinkedIn,
  IconShuffle,
  IconCelebration,
} from "../components/icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import globalStyles from "../globals.module.scss";
import styles from "./meeting-page.module.scss";

const STAGES = Object.freeze({
  intro: {
    label: "Introduce yourself",
    duration: 0.1,
  },
  icebreaker: {
    duration: 0.15,
  },
  linkedIn: { label: "Connect on LinkedIn", duration: 0.15 },
});

const MeetingStageIndicator = ({ icon, label, isActive = false }) => {
  return (
    <article
      className={`${styles.meetingStageIndicator} ${
        isActive ? styles.isActive : ""
      }`}
    >
      <div>{icon}</div>
      <p>{label}</p>
    </article>
  );
};



const Timer = ({
  durationMinutes,
  currentStage,
  setCurrentStage,
  setCurrentTimerDuration,
  setHasMeetingEnded,
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Add leading zeros if necessary
    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    const secondsString =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return minutesString + ":" + secondsString;
  };

  return (
    <CountdownCircleTimer
      duration={60 * durationMinutes}
      colors="#3B82F6"
      size="286"
      isPlaying
      strokeWidth="8"
      trailColor="#18181B"
      onComplete={() => {
        setCurrentStage(currentStage === "intro" ? "icebreaker" : "linkedIn");
        setCurrentTimerDuration(STAGES[currentStage].duration);

        if (currentStage === "linkedIn") {
          setHasMeetingEnded(true);
        }

        return { shouldRepeat: currentStage !== "linkedIn" };
      }}
    >
      {({ remainingTime }) => (
        <p className={styles.timerLabel}>{formatTime(remainingTime)}</p>
      )}
    </CountdownCircleTimer>
  );
};

export const MeetingPage = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState("intro");

  const [currentTimerDuration, setCurrentTimerDuration] = useState(
    STAGES[currentStage].duration
  );
  const [icebreakerQuestions, setIcebreakerQuestions] = useState([
    "What's your favorite movie?",
    "Which country would you like to visit next?",
    "How do you like to spend your weekends?",
  ]);
  const [currentIcebreakerQuestion, setCurrentIcebreakerQuestion] = useState(0);
  const [hasMeetingEnded, setHasMeetingEnded] = useState(false);

  const onClickChangeIcebreakerQuestion = () => {
    if (currentIcebreakerQuestion === icebreakerQuestions.length - 1) {
      setCurrentIcebreakerQuestion(0);
    } else {
      setCurrentIcebreakerQuestion(currentIcebreakerQuestion + 1);
    }
  };

  const endMeeting = async () => {
    try {
      // Make the user available again when ending the meeting
      await axios.patch('http://localhost:3000/user/makeAvailable', {}, {
        withCredentials: true,
      });
      // After updating the availability, navigate to the home page
      navigate("/home");
    } catch (error) {
      console.error("Error making user available:", error);
      // Handle the error, for example by showing an error message to the user
    }
  };



  

  return hasMeetingEnded ? (
    <PageLayout
      className={styles.meetingEndedPage}
      buttons={
        <>
          <Button
            onClick={endMeeting}
          >
            Back Home
          </Button>
        </>
      }
    >
      <IconCelebration />
      <div>
        <p className={globalStyles.subtitle}>You just connected with</p>
        <h1>Bobby Chan</h1>
      </div>
      <section>
        <Avatar />
        <Avatar />
      </section>
    </PageLayout>
  ) : (
    <PageLayout
      className={styles.meetingPage}
      buttons={
        <>
          <Button variant="secondary" onClick={endMeeting}>
            End Meeting
          </Button>
        </>
      }
    >
      <p>05:23</p>
      <article className={styles.title}>
        <p className={globalStyles.subtitle}>Currently Meeting</p>
        <h1>Bobby Chan</h1>
      </article>
      <article className={styles.meetingStageTimeline}>
        <MeetingStageIndicator
          icon={<IconIntro />}
          label="Intros"
          isActive={currentStage === "intro"}
        />
        <MeetingStageIndicator
          icon={<IconIcebreaker />}
          label="Icebreakers"
          isActive={currentStage === "icebreaker"}
        />
        <MeetingStageIndicator
          icon={<IconLinkedIn />}
          label="LinkedIn"
          isActive={currentStage === "linkedIn"}
        />
      </article>
      <article className={styles.timer}>
        <Timer
          durationMinutes={currentTimerDuration}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          setCurrentTimerDuration={setCurrentTimerDuration}
          setHasMeetingEnded={setHasMeetingEnded}
        />
      </article>
      <article className={styles.prompt}>
        <p className={globalStyles.titleSmall}>
          {currentStage !== "icebreaker"
            ? STAGES[currentStage].label
            : icebreakerQuestions[currentIcebreakerQuestion]}
        </p>
        {currentStage === "icebreaker" && (
          <button
            className={styles.shuffleButton}
            onClick={onClickChangeIcebreakerQuestion}
          >
            <IconShuffle />
          </button>
        )}
      </article>
    </PageLayout>
  );
};
