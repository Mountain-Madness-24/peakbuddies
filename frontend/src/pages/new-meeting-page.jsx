import { PageLayout, Avatar, Button } from "../components/";
import {
  IconWork,
  IconSchool,
  IconTime,
  IconLocation,
} from "../components/icons";
import { useNavigate } from "react-router-dom";

import globalStyles from "../globals.module.scss";
import styles from "./new-meeting-page.module.scss";

export const NewMeetingPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  return (
    <PageLayout
      buttons={
        <>
          <Button>Start Meeting</Button>
          <Button variant="secondary">Ping Bobby</Button>
          <Button 
            variant="tetriary"
            onClick={goHome}
          >Decline Meeting</Button>
        </>
      }
    >
      <article className={styles.header}>
        <Avatar />
        <section className={styles.title}>
          <p className={globalStyles.subtitle}>New Meeting</p>
          <h1>Bobby Chan</h1>
        </section>
        <section className={styles.info}>
          <div>
            <IconSchool />
            <p>Simon Fraser University</p>
          </div>
          <div>
            <IconWork />
            <p>Software Developer @ Microsoft</p>
          </div>
        </section>
      </article>
      <article className={styles.locationDate}>
        <section>
          <IconLocation />
          <p className={globalStyles.subtitle}>Location</p>
          <p className={globalStyles.titleSmall}>Tasc 9204</p>
        </section>
        <section>
          <IconTime />
          <p className={globalStyles.subtitle}>Time</p>
          <p className={globalStyles.titleSmall}>12:45 pm</p>
        </section>
      </article>
    </PageLayout>
  );
};
