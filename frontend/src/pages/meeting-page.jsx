import { PageLayout, Button } from "../components";
import { IconIntro, IconIcebreaker, IconLinkedIn } from "../components/icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import globalStyles from "../globals.module.scss";
import styles from "./meeting-page.module.scss";

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

const Timer = ({ duration }) => {
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
    <CountdownCircleTimer isPlaying duration={60 * 5} colors="#3B82F6">
      {({ remainingTime }) => formatTime(remainingTime)}
    </CountdownCircleTimer>
  );
};

export const MeetingPage = () => {
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
          isActive={true}
        />
        <MeetingStageIndicator icon={<IconIcebreaker />} label="Icebreakers" />
        <MeetingStageIndicator icon={<IconLinkedIn />} label="LinkedIn" />
      </article>
      <article className={styles.timer}>
        <Timer />
      </article>
    </PageLayout>
  );
};
