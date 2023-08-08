import styles from "./Controls/Controls.module.css"
import path from "../../utils/basepath"
import { useState } from "react"
import { createErrorMessage } from "../../Message"

const getCurrentDate = () => {
  const dateObj = new Date()

  const hour = dateObj.getHours()
  let dueTime
  if (hour == 0) {
    dueTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    let mins = dueTime.split(":")[1]
    dueTime = `00:${mins}`
  } else {
    dueTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }
  const dueDate = dateObj.toISOString().split("T")[0]
  return { dueDate, dueTime }
}

const createTask = async (data, id) => {
  let date = new Date(`${data.dueDate} ${data.dueTime}`)
  // first do checks for data
  if (data.title.trim() == "") {
    return "title"
  } else if (date.getTime() < new Date().getTime()) {
    return "time"
  }
  let body = {
    title: data.title,
    content: data.content,
    timeDue: date.toISOString(),
  }
  const res = await fetch(`${path}/api/db/tasks/${id}/update`, {
    method: "POST",
    body: JSON.stringify(body),
  })
  if (res.status == 200) {
    return "success"
  }
}

const updateTask = async (data, uid) => {
  let date = new Date(`${data.dueDate} ${data.dueTime}`).toISOString()
  let body = {
    title: data.title,
    id: data.id,
    content: data.content,
    timeDue: date,
  }
  const res = await fetch(`${path}/api/db/tasks/${uid}/update`, {
    method: "POST",
    body: JSON.stringify(body),
  })
  if (res.status == 200) {
    return "success"
  }
}

const ModifyingTask = ({
  uid,
  close,
  updateTasks,
  isUpdating,
  startingData,
}) => {
  const { dueDate, dueTime } = getCurrentDate()
  const [createdTask, setCreatedTask] = useState(
    isUpdating
      ? {
          ...startingData,
        }
      : {
          title: "",
          content: "",
          dueTime,
          dueDate,
        }
  )
  return (
    <div className={styles.creatingTaskCont}>
      <input
        className={styles.title}
        defaultValue={createdTask.title}
        onChange={(e) => {
          setCreatedTask((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }}
        placeholder="New reminder"
      ></input>
      <textarea
        defaultValue={createdTask.content}
        rows="6"
        placeholder={"Description..."}
        className={`betterScroll ${styles.description}`}
        onChange={(e) => {
          setCreatedTask((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }}
      ></textarea>
      <span style={{ display: "flex", alignItems: "center" }}>
        <a className={styles.dateLabel}>Done by:</a>
        <input
          onChange={(e) => {
            setCreatedTask((prev) => ({
              ...prev,
              dueDate: e.target.value,
            }))
          }}
          defaultValue={createdTask.dueDate}
          type="date"
          className={styles.dateInput}
        />
        <input
          onChange={(e) => {
            setCreatedTask((prev) => ({
              ...prev,
              dueTime: e.target.value,
            }))
          }}
          defaultValue={createdTask.dueTime}
          type="time"
          className={styles.dateInput}
        />
      </span>
      <button
        onClick={
          isUpdating
            ? () => {
                updateTask(createdTask, uid).then((d) => {
                  if (d == "success") {
                    updateTasks()
                    close()
                  }
                })
              }
            : () => {
                createTask(createdTask, uid).then((d) => {
                  if (d == "success") {
                    updateTasks()
                    close()
                  } else if (d == "title") {
                    // !ghere
                    createErrorMessage(
                      5,
                      "Please enter a title.",
                      undefined,
                      "error"
                    )
                  } else if (d == "time") {
                    createErrorMessage(
                      5,
                      "Due time cannot be in the past.",
                      undefined,
                      "error"
                    )
                  }
                })
              }
        }
        className={`button ${styles.submit}`}
      >
        {isUpdating ? "Save changes." : "Create reminder."}
      </button>
    </div>
  )
}

export default ModifyingTask
