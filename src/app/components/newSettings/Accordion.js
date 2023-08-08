import { useState } from "react"
import styles from "./Accordion.module.css"

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.AccordionCont}>
      <div
        className={`${styles.AccordionTitleCont} ${isOpen && styles.open}`}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <h1>{title}</h1>
        <div></div>
      </div>
      <div
        className={`${styles.AccordionContentCont} ${isOpen && styles.open}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
