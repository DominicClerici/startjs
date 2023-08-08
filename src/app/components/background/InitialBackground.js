import LoadedBackground from "./LoadedBackground"
import styles from "./Background.module.css"

const InitialBackground = () => {
  return (
    <>
      <LoadedBackground></LoadedBackground>
      <div className={styles.initial}></div>
    </>
  )
}

export default InitialBackground
