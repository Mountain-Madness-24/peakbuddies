import { PageLayout, Button } from "../components";
import {
  IconIntro,
  IconIcebreaker,
  IconLinkedIn,
  IconShuffle,
} from "../components/icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";

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
        return { shouldRepeat: true };
      }}
    >
      {({ remainingTime }) => (
        <p className={styles.timerLabel}>{formatTime(remainingTime)}</p>
      )}
    </CountdownCircleTimer>
  );
};

export const MeetingPage = () => {
  const [currentStage, setCurrentStage] = useState("intro");
  const [currentTimerDuration, setCurrentTimerDuration] = useState(
    STAGES[currentStage].duration
  );
  const [icebreakerQuestions, setIcebreakerQuestions] = useState([
    "What's your favorite movie?",
    "What's your favorite food?",
    "What's your favorite color?",
  ]);
  const [currentIcebreakerQuestion, setCurrentIcebreakerQuestion] = useState(0);

  const onClickChangeIcebreakerQuestion = () => {
    if (currentIcebreakerQuestion === icebreakerQuestions.length - 1) {
      setCurrentIcebreakerQuestion(0);
    } else {
      setCurrentIcebreakerQuestion(currentIcebreakerQuestion + 1);
    }
  };

  return (
    <PageLayout
      className={styles.meetingPage}
      buttons={
        <>
          <Button variant="secondary">End Meeting</Button>
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
        />
      </article>
      <article className={styles.prompt}>
        <p className={globalStyles.titleSmall}>
          {currentStage !== "icebreakers"
            ? STAGES[currentStage].label
            : icebreakerQuestions[currentIcebreakerQuestion]}
        </p>
        {currentStage === "icebreakers" && (
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
