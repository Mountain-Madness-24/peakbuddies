import styles from "./form-field.module.scss";

export const FormField = ({ type = "text", label, id, name }) => {
  return (
    <fieldset className={styles.formField}>
      {label && <label htmlFor={id}>{label}</label>}
      {type === "textarea" ? (
        <textarea id={id} name={name}></textarea>
      ) : (
        <input type={type} id={id} name={name} />
      )}
    </fieldset>
  );
};
