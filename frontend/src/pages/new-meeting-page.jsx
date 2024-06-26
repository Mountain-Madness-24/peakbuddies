import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PageLayout, Avatar, Button, EmitEvent, SocketComponent } from "../components/";
import {
  IconWork,
  IconSchool,
  IconTime,
  IconLocation,
} from "../components/icons";
import { useNavigate, useParams } from "react-router-dom";
import { format, addMinutes } from "date-fns";
import mapboxgl from "mapbox-gl";

import globalStyles from "../globals.module.scss";
import styles from "./new-meeting-page.module.scss";

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
  const userId = localStorage.getItem("userId");
  const mapContainer = useRef(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      mapboxgl.accessToken =
        "pk.eyJ1Ijoia2lhbmhrNiIsImEiOiJjbHU1YzY2NHcxdDA3MmtwcHlhbHp5eTRxIn0.gd5SsAWT75NUaNwTwB21Zg";
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [meetingDetails[0].locationLatLon.lon, meetingDetails[0].locationLatLon.lat],
        // center: [-122.91813898293222, 49.277016401899544],
        zoom: 15,
      });
      console.log([meetingDetails[0].locationLatLon.lon, meetingDetails[0].locationLatLon.lat])
      const marker = new mapboxgl.Marker().setLngLat( [meetingDetails[0].locationLatLon.lon, meetingDetails[0].locationLatLon.lat]).addTo(map);

    });
  }, []); 


  
  
  // Depend on currentMarker to ensure marker is managed correctly
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

  const startMeeting = async () => {
    try {
      // Make the user unavailable before starting the meeting
      await axios.patch('http://localhost:3000/user/makeUnavailable', {}, {
        withCredentials: true,
      });
      // After making the user unavailable, navigate to the meeting
      navigate(`/meeting/${id}`);
    } catch (error) {
      console.error("Error making user unavailable:", error);
      // You may want to handle this error differently, e.g., show a notification
    }
  };

  useEffect(() => {
    const fetchOtherUser = async () => {

      console.log(meetingDetails[0])

      try {
        const otherUserId = meetingDetails[0].membersOfMeeting.find(
          (memberId) => memberId !== userId
        );
        const response = await axios.get(
          `http://localhost:3000/user/getuser/${otherUserId}`,
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

  const pingOtherUser = () => {
    console.log(meetingDetails[0].membersOfMeeting);

    const otherPersonId = meetingDetails[0].membersOfMeeting.find(
      (memberId) => memberId !== userId
    );

    console.log("Pinging other person:", otherPersonId);
    EmitEvent("pingOtherPerson", otherPersonId);
  };

  const { time } = meetingDetails[0].startingTime
    ? getFormattedTime(meetingDetails[0].startingTime)
    : { time: "", minutes: "" };

  const timeToMeet = meetingDetails[0].startingTime;
  console.log("TIME TO MEET:", new Date(timeToMeet) - new Date());
  const timeToMeetInMinutes = Math.floor(
    (new Date(timeToMeet) - new Date()) / 60000
  );



  return (
    <PageLayout
    header={<>        
      {mapContainer && <div ref={mapContainer} style={{ width: "100%", height: "164px" }}></div>}
    </>}
      buttons={
        <>
          <Button onClick={startMeeting}>
            Start Meeting
          </Button>
          <Button variant="secondary" onClick={pingOtherUser}>
            {otherUser ? `Ping ${otherUser.firstName}` : "Ping User"}
          </Button>

          <Button variant="tetriary" onClick={goHome}>
            Decline Meeting
          </Button>
        </>
      }
    >
      <SocketComponent userId={userId} />
      <div 
        style={{ 
            position: "absolute",
            left: "0px",
            top: "0px",
            bottom: "-1px",
            height: "156px", 
            width:"100%", 
            transform: "translateY(10px)",
            backgroundImage: `linear-gradient(180deg, rgba(9,9,11,0) 30%, rgba(9,9,11,1) 100%)`}}>

      </div>
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
            {meetingDetails[0].locationName}
          </p>
        </section>
        <section>
          <IconTime />
          <p className={globalStyles.subtitle}>Time</p>
          <p className={globalStyles.titleSmall}>
            {time} <br /> IN {timeToMeetInMinutes } MINS
          </p>
        </section>
      </article>
    </PageLayout>
  );
};