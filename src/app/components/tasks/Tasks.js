import getSession from "../../utils/getSession"
import Opener from "./Opener"
import Signin from "./Signin"

const Tasks = async () => {
  const user = await getSession()
  if (user) {
    return <Opener uid={user.userId}></Opener>
  } else {
    return <Signin></Signin>
  }
}

export default Tasks
