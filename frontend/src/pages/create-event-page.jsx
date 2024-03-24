import { PageLayout, HeaderImage, FormField, Button } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import globalStyles from "../globals.module.scss";
import styles from "./create-event-page.module.scss";

export const CreateEventPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nameOfEvent, description, startDate, endDate } = event.target;

    try {
      const res = await axios.post(
        "http://localhost:3000/event/createEvent",
        {
          nameOfEvent: nameOfEvent.value,
          description: description.value,
          startDate: startDate.value,
          endDate: endDate.value,
        },
        { withCredentials: true }
      );

      navigate(`/event/${res.data.eventId}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <PageLayout
      includeNav
      header={<HeaderImage />}
      className={styles.createEventPage}
    >
      <form onSubmit={handleSubmit}>
        <h1>Create Event</h1>
        <section className={styles.fields}>
          <FormField label="Name" type="text" name="nameOfEvent" />
          <FormField label="Description" type="textarea" name="description" />
          <FormField label="Start Date" type="date" name="startDate" />
          <FormField label="End Date" type="date" name="endDate" />
        </section>
        <Button type="submit">Create Event</Button>
      </form>
    </PageLayout>
  );
};
