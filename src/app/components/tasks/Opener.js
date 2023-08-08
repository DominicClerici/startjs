"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./Tasks.module.css"
import Window from "./Window"
import { getTasks } from "./utilFunctions"

const Opener = ({ uid }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState(undefined)

  const updateTasks = () => {
    getTasks(uid).then((d) => {
      setTasks(d.UserTasks)
    })
  }

  useEffect(() => {
    updateTasks()
  }, [])

  useEffect(() => {
    let el = document.getElementById("sideMove")
    if (isOpen) {
      el.classList.add("right")
    } else {
      el.classList.remove("right")
    }
  }, [isOpen])
  if (tasks == "failed") {
    return (
      <>
        <div
          className={`${styles.edge} ${isOpen && styles.open}`}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true)
            }
          }}
        >
          <div className={`${styles.notif} ${isOpen && styles.open}`}>1</div>
          <a className={styles.error}>Could not refresh reminders.</a>
        </div>
        <div
          className={`${styles.clickHandler} ${isOpen && styles.open}`}
          onClick={() => setIsOpen(false)}
        ></div>
      </>
    )
  } else if (tasks == "user not logged in") {
    return <></>
  } else {
    return (
      <>
        <div
          className={`${styles.edge} ${isOpen && styles.open}`}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true)
            }
          }}
        >
          <div className={`${styles.notif} ${isOpen && styles.open}`}>
            {tasks ? tasks.length : "+"}
          </div>
          {isOpen && (
            <Window
              upd={updateTasks}
              tasks={tasks}
              uid={uid}
              setIsOpen={setIsOpen}
            ></Window>
          )}
        </div>
        <div
          className={`${styles.clickHandler} ${isOpen && styles.open}`}
          onClick={() => setIsOpen(false)}
        ></div>
      </>
    )
  }
}

export default Opener
