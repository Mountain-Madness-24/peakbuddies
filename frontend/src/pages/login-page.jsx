import { PageLayout, Button, HeaderImage } from "../components";
import { IconLinkedIn, IconLogo } from "../components/icons";

import globalStyles from "../globals.module.scss";
import styles from "./login-page.module.scss";

export const LoginPage = () => (
  <PageLayout header={<HeaderImage />}>
    <div className={styles.loginPage}>
      <IconLogo />
      <h1>Peak Buddies</h1>
      <p className={globalStyles.subtitle}>
        Connect with your hackathon
        <br />
        community in real time
      </p>
      <Button>
        <IconLinkedIn />
        Login with LinkedIn
      </Button>
    </div>
  </PageLayout>
);
