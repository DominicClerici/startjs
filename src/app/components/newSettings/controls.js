import styles from "./controls.module.css"

const Toggle = ({ label, explainer, set, val, target }) => {
  const changeHandler = (e) => {
    set((prev) => ({
      ...prev,
      [target]: e.target.checked,
    }))
  }
  return (
    <div className={styles.toggleContainer}>
      <div className={styles.labelContainer}>
        <a className={styles.label}>{label}</a>
        {explainer && <a className={styles.explainer}>{explainer}</a>}
      </div>
      <input
        checked={val}
        className={styles.toggle}
        onChange={changeHandler}
        type="checkbox"
      ></input>
    </div>
  )
}

export { Toggle }
