import React, { useEffect, useState } from "react";
import axios from "axios";
import { PageLayout, Avatar, Button } from "../components/";
import {
  IconWork,
  IconSchool,
  IconTime,
  IconLocation,
} from "../components/icons";
import { useNavigate, useParams } from "react-router-dom";

import globalStyles from "../globals.module.scss";
import styles from "./new-meeting-page.module.scss";

export const NewMeetingPage = () => {
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/meetings/${id}`,
          {
            withCredentials: true, // Include this to send cookies with the request
          }
        );
        setMeetingDetails(response.data);
      } catch (error) {
        console.error("Error fetching meeting details:", error);
      }
    };

    fetchMeetingDetails();
  }, [id]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/getuser/${meetingDetails.membersOfMeeting[1]}`,
          {
            withCredentials: true,
          }
        );
        setOtherUser(response.data);
      } catch (error) {
        console.error("Error fetching other user details:", error);
      }
    };

    if (meetingDetails) {
      fetchOtherUser();
    }
  }, [meetingDetails]);

  const goHome = () => {
    navigate("/");
  };

  if (!meetingDetails) {
    return <div>Loading meeting details...</div>;
  }

  return (
    <PageLayout
      buttons={
        <>
          <Button onClick={() => navigate(`/meeting/${id}`)}>
            Start Meeting
          </Button>
          <Button variant="secondary">
            Ping&nbsp;&nbsp;&nbsp;{otherUser.firstName}
          </Button>
          <Button variant="tetriary" onClick={goHome}>
            Decline Meeting
          </Button>
        </>
      }
    >
      <article className={styles.header}>
        <Avatar />
        <section className={styles.title}>
          <p className={globalStyles.subtitle}>New Meeting</p>
          <h1>
            {otherUser.firstName}&nbsp;&nbsp;{otherUser.lastName}
          </h1>
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
          <p className={globalStyles.titleSmall}>
            {meetingDetails.locationName}
          </p>
        </section>
        <section>
          <IconTime />
          <p className={globalStyles.subtitle}>Time</p>
          <p className={globalStyles.titleSmall}>{formatDate}</p>
        </section>
      </article>
    </PageLayout>
  );
};
