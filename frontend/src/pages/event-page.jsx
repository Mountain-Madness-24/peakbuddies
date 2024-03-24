import { useState } from "react";
import { PageLayout, NavBar, Avatar, HeaderImage } from "../components";
import { IconPeople } from "../components/icons";

import globalStyles from "../globals.module.scss";
import styles from "./event-page.module.scss";

export const EventPage = () => {
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 5,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/?portrait",
    },
  ]);

  return (
    <PageLayout header={<HeaderImage />}>
      <NavBar className={styles.navBar} />
      <article className={styles.title}>
        <p className={globalStyles.subtitle}>Mar 23 - 24</p>
        <h1>Mountain Madness 2024</h1>
        <span className={styles.joinedTag}>You've Joined</span>
      </article>
      <article>
        <span className={styles.participantsTag}>
          <IconPeople />
          24 People to Connect With
        </span>
        <section className={styles.participantGrid}>
          {participants.map(({ avatar }, index) => (
            <a>
              <Avatar key={index} src={avatar} />
            </a>
          ))}
        </section>
      </article>
    </PageLayout>
  );
};
