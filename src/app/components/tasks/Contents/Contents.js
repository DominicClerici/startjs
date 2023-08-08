import styles from "./Contents.module.css"
import Image from "next/image"
import check from "../../../images/check.png"
import edit from "../../../images/edit.png"
import path from "../../../utils/basepath"
import { useState } from "react"
import ModifyingTask from "../ModifyingTask"

const formatDate = (dateStr) => {
  let date = new Date(dateStr)
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  let suffix = "th"
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st"
  } else if (day === 2 || day === 22) {
    suffix = "nd"
  } else if (day === 3 || day === 23) {
    suffix = "rd"
  }
  return `${month} ${day}${suffix}`
}

const calculatePercentagePassed = (startDateJSON, endDateJSON) => {
  const startDate = new Date(startDateJSON).getTime()
  const endDate = new Date(endDateJSON).getTime()
  let currentDate = new Date().getTime()
  if (currentDate > endDate) {
    currentDate = endDate
  }
  const totalTimeRange = endDate - startDate
  const timePassed = currentDate - startDate
  let percentagePassed = (timePassed / totalTimeRange) * 100
  if (percentagePassed < 5) {
    percentagePassed = 5
  }
  return `${percentagePassed}%`
}

const formatDateTimeFromISOString = (isoString) => {
  const dateObj = new Date(isoString)
  const dueTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const dueDate = dateObj.toISOString().split("T")[0]
  return { dueDate, dueTime }
}

const deleteTask = async (id, uid) => {
  const res = await fetch(`${path}/api/db/tasks/${uid}/delete`, {
    method: "POST",
    body: JSON.stringify({ id: id }),
  })
  if (res.status == 200) {
    return "success"
  }
}

const Task = ({ uid, updateTasks, title, content, createdAt, timeDue, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  if (isEditing) {
    const { dueDate, dueTime } = formatDateTimeFromISOString(timeDue)

    return (
      <ModifyingTask
        uid={uid}
        isUpdating={true}
        startingData={{
          title,
          content,
          dueTime,
          dueDate,
          id,
        }}
        close={() => setIsEditing(false)}
        updateTasks={updateTasks}
      ></ModifyingTask>
    )
  } else {
    return (
      <div className={styles.taskContainer}>
        <a className={styles.title}>{title}</a>
        <p className={`betterScroll ${styles.content}`}>{content}</p>
        <span className={styles.dateBar}>
          <a>{formatDate(createdAt)}</a>
          <div className={styles.progressBar}>
            <div
              style={{
                width: calculatePercentagePassed(createdAt, timeDue),
              }}
            ></div>
          </div>
          <a>{formatDate(timeDue)}</a>
          <Image
            src={edit}
            height={30}
            width={30}
            alt="Edit Icon"
            onClick={() => {
              setIsEditing(true)
            }}
          ></Image>
          <Image
            src={check}
            height={30}
            width={30}
            alt="Complete Icon"
            onClick={() => {
              deleteTask(id, uid).then((d) => {
                if (d == "success") {
                  updateTasks()
                }
              })
            }}
          ></Image>
        </span>
      </div>
    )
  }
}

const Contents = ({ tasks, uid, updateTasks }) => {
  if (tasks) {
    return (
      <div className={`betterScroll ${styles.container}`}>
        {tasks.map((e) => {
          console.log(e)
          return (
            // uid, updateTasks, title, content, createdAt, timeDue, id
            <Task
              key={e.id}
              uid={uid}
              updateTasks={updateTasks}
              title={e.title}
              content={e.content}
              createdAt={e.createdAt}
              timeDue={e.timeDue}
              id={e.id}
            ></Task>
            // <div key={e.id} className={styles.taskContainer}>
            //   <a className={styles.title}>{e.title}</a>
            //   <p className={styles.content}>{e.content}</p>
            //   <span className={styles.dateBar}>
            //     <a>{formatDate(e.createdAt)}</a>
            //     <div className={styles.progressBar}>
            //       <div
            //         style={{
            //           width: calculatePercentagePassed(e.createdAt, e.timeDue),
            //         }}
            //       ></div>
            //     </div>
            //     <a>{formatDate(e.timeDue)}</a>
            //     <Image
            //       src={edit}
            //       height={30}
            //       width={30}
            //       alt="Edit Icon"
            //       onClick={() => {
            //         editTask(e.id)
            //       }}
            //     ></Image>
            //     <Image
            //       src={check}
            //       height={30}
            //       width={30}
            //       alt="Complete Icon"
            //       onClick={() => {
            //         deleteTask(e.id, uid).then((d) => {
            //           if (d == "success") {
            //             updateTasks()
            //           }
            //         })
            //       }}
            //     ></Image>
            //   </span>
            // </div>
          )
        })}
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Contents
