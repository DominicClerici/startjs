import Image from "next/image"
import styles from "./Controls.module.css"
import close from "../../../images/close_large.png"
import { useState } from "react"
import ModifyingTask from "../ModifyingTask"
import path from "../../../utils/basepath"
import { createErrorMessage } from "../../../Message"

const deleteAll = async (uid) => {
  let res = await fetch(`${path}/api/db/tasks/${uid}/deleteAll`)
  if (res.status == 200) {
    return "success"
  }
}

const Controls = ({ setIsOpen, updateTasks, uid }) => {
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [confirming, setConfirming] = useState(false)
  return (
    <>
      <div className={styles.container}>
        <button
          onClick={() => {
            if (confirming) {
              deleteAll(uid).then((d) => {
                if (d == "success") {
                  updateTasks()
                  createErrorMessage(
                    5,
                    "Deleted all reminders.",
                    undefined,
                    "general"
                  )
                  setConfirming(false)
                } else {
                  createErrorMessage(
                    5,
                    "Failed to delete all reminders",
                    "Internal server error",
                    "error"
                  )
                  setConfirming(false)
                }
              })
            } else {
              setConfirming(true)
            }
          }}
          className={`button ${styles.clear}`}
        >
          {confirming ? "Confirm" : "Remove all"}
        </button>
        <button
          onClick={() => {
            setIsCreatingTask(!isCreatingTask)
          }}
          className={`button ${styles.create}`}
        >
          {isCreatingTask ? "Cancel" : "Create new reminder"}
        </button>
        <Image
          onClick={() => {
            setIsOpen(false)
          }}
          className={styles.close}
          src={close}
          width={35}
          height={35}
          alt="close icon"
        ></Image>
      </div>
      {isCreatingTask && (
        <ModifyingTask
          uid={uid}
          updateTasks={updateTasks}
          close={() => {
            setIsCreatingTask(false)
          }}
        ></ModifyingTask>
      )}
    </>
  )
}

export default Controls
