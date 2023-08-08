import styles from "./Tasks.module.css"
import Contents from "./Contents/Contents"
import Controls from "./Controls/Controls"

const Window = ({ setIsOpen, tasks, uid, upd }) => {
  return (
    <div className={`betterScroll ${styles.window}`}>
      <Controls updateTasks={upd} uid={uid} setIsOpen={setIsOpen}></Controls>
      <Contents updateTasks={upd} uid={uid} tasks={tasks}></Contents>
    </div>
  )
}

export default Window
