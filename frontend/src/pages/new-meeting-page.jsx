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
import { format, addMinutes } from "date-fns";

import globalStyles from "../globals.module.scss";
import styles from "./new-meeting-page.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

export const NewMeetingPage = () => {
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [otherUser, setOtherUser] = useState({
    firstName: "",
    lastName: "",
    school: "",
    recentExperience: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/meetings/${id}`,
          {
            withCredentials: true,
          }
        );
        setMeetingDetails(response.data);
        console.log("DEETS:", response.data);
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
        console.log("OTHER USER:", response.data);
      } catch (error) {
        console.error("Error fetching other user details:", error);
      }
    };

    if (meetingDetails) {
      fetchOtherUser();
    }
  }, [meetingDetails]);

  const goHome = () => {
    navigate("/home");
  };

  if (!meetingDetails) {
    return <div>Loading meeting details...</div>;
  }

  const getFormattedTime = (dateString) => {
    const date = new Date(dateString);
    const datePlus15Min = addMinutes(date, 15); // Add 15 minutes
    const time = format(datePlus15Min, "h:mm aaaa"); // Format: 12:45 PM
    const minutes = format(datePlus15Min, "m"); // Extract minutes

    return {
      time, // "12:45 PM"
      minutes, // "15"
    };
  };

  const { time, minutes } = meetingDetails.startingTime
    ? getFormattedTime(meetingDetails.startingTime)
    : { time: "", minutes: "" };

  return (
    <PageLayout
      buttons={
        <>
          <Button onClick={() => navigate(`/meeting/${id}`)}>
            Start Meeting
          </Button>
          <Button variant="secondary">
            {otherUser ? `Ping ${otherUser.firstName}` : "Ping User"}
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
            <p>{otherUser.school}</p>
          </div>
          <div>
            <IconWork />
            <p>{otherUser.recentExperience}</p>
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
          <p className={globalStyles.titleSmall}>
            {time} <br /> IN {minutes} MINS
          </p>
        </section>
      </article>
    </PageLayout>
  );
};
