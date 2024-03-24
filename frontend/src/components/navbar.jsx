import { IconProfile, IconHome } from "./icons";
import styles from "./navbar.module.scss";

export const NavBar = () => {

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <IconHome />
                </li>
                <li className={styles.li}>
                    <IconProfile />
                </li>
            </ul>
        </nav>
    )
};
