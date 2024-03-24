import { PageLayout, Avatar, Button, EmitEvent } from "../components/";
import {
  IconWork,
  IconSchool,
  IconTime,
  IconLocation,
} from "../components/icons";
import { useNavigate } from "react-router-dom";

import globalStyles from "../globals.module.scss";
import styles from "./new-meeting-page.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

export const NewMeetingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const goHome = () => {
    navigate('/');
  }

  const getOtherPersonUserId = async () => {
    // GET /meetings/:meetingId - Returns meeting details
    try {
    const meetingDetails = await axios.get(`http://localhost:3000/meetings/${id}`, {
      withCredentials: true,
    });

    const membersInMeeting = meetingDetails.data[0].membersOfMeeting;
    console.log("Members in meeting", membersInMeeting);

    const other = membersInMeeting.filter((member) => member !== "KmrdadwAHJ")[0];
    EmitEvent('pingOtherPerson', other);

  } catch (error) {
    console.error("Failed to get meeting details", error);
  }

  }

  return (
    <PageLayout
      buttons={
        <>
          <Button>Start Meeting</Button>
          <Button 
            variant="secondary"
            onClick={getOtherPersonUserId}
          >Ping Bobby</Button>
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
