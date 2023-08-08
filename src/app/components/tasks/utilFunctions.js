import path from "../../utils/basepath"
import { createErrorMessage } from "../../Message"

const getTasks = async (id) => {
  if (id) {
    let res = await fetch(`${path}/api/db/tasks/${id}/get`)
    if (res.status == 200) {
      return res.json()
    } else {
      createErrorMessage(
        5,
        "Cannot update reminders.",
        "Internal server error.",
        "error"
      )
      return "failed"
    }
  } else {
    return "user not logged in"
  }
}

export { getTasks }
