import getSession from "../../utils/getSession"
import Window from "./Window"

const Settings = async () => {
  let data = await getSession()
  if (data) {
    return <Window uid={data.userId}></Window>
  } else {
    return <></>
  }
}

export default Settings
