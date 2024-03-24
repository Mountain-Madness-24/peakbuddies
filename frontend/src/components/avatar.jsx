import styles from "./avatar.module.scss";

export const Avatar = ({ src }) => {
  return (
    <article className={styles.avatar}>
      {!!src ? <img src={src} alt="Avatar image" /> : <p>A</p>}
    </article>
  );
};
