import styles from "./avatar.module.scss";

export const Avatar = ({ src, id }) => {
  return (
    <article className={styles.avatar}>
      <img
        src={`https://source.unsplash.com/random/900x700/?portrait&${id}`}
        alt="Avatar image"
      />
    </article>
  );
};
