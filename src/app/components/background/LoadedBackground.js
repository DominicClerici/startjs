import styles from "./Background.module.css"
import getSession from "../../utils/getSession"
import path from "../../utils/basepath"
import Image from "next/image"
import VarUpdater from "./VarUpdater"

const getData = async (id) => {
  let res = await fetch(`${path}/api/db/settings/${id}/get`)
  if (res.status == 200) {
    return res.json()
  }
}

const LoadedBackground = async () => {
  const user = await getSession()
  if (user) {
    const res = await getData(user.userId)
    const data = res.settings
    if (data) {
      if (data.backgroundType == "Solid color") {
        return (
          <>
            <VarUpdater uid={user.userId}></VarUpdater>
            <div
              className={styles.background}
              style={{
                background: data.darkMode
                  ? data.backgroundColorDark
                  : data.backgroundColorLight,
              }}
            ></div>
          </>
        )
      } else if (data.backgroundType == "Gradient") {
        return (
          <>
            <VarUpdater uid={user.userId}></VarUpdater>
            <div
              className={styles.background}
              style={{
                backgroundImage: data.darkMode
                  ? data.backgroundGradientDark
                  : data.backgroundGradientLight,
              }}
            ></div>
          </>
        )
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }
  return <></>
}

export default LoadedBackground
