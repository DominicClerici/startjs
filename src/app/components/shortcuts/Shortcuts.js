import styles from "./Shortcuts.module.css"
import path from "../../utils/basepath"
import globe from "../../images/globe.png"
import getSession from "../../utils/getSession"
import Image from "next/image"
import ErrorMsg from "./ErrorMsg"

const getData = async (session) => {
  let res = await fetch(path + `/api/db/shortcuts/${session.userId}/get`)
  if (res.status == 200) {
    return res.json()
  }
}

const Shortcuts = async () => {
  const session = await getSession()
  let data
  if (session) {
    data = await getData(session)
  } else {
    data = {
      UserShortcuts: [
        {
          title: "Work",
          items: [
            { name: "StackOverflow", url: "https://www.stackoverflow.com/" },
            { name: "Slack", url: "https://slack.com/" },
            {
              name: "Teams",
              url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software",
            },
            {
              name: "Zoom",
              url: "https://zoom.us/",
            },
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/",
            },
            {
              name: "ChatGPT",
              url: "https://chat.openai.com/",
            },
          ],
        },
        {
          title: "Education",
          items: [
            { name: "Wikipedia", url: "https://www.wikipedia.com/" },
            { name: "MDN Docs", url: "https://developer.mozilla.org/" },
            { name: "W3 Schools", url: "https://www.w3schools.com/" },
            { name: "Canvas", url: "https://canvas.instructure.com/" },
            {
              name: "Notion",
              url: "https://www.notion.so/",
            },
          ],
        },
        {
          title: "Social",
          items: [
            { name: "Facebook", url: "https://www.facebook.com/" },
            { name: "Twitter/X", url: "https://www.twitter.com/" },
            { name: "Instagram", url: "https://www.instagram.com/" },
            { name: "Reddit", url: "https://www.reddit.com/" },
            { name: "Youtube", url: "https://www.youtube.com/" },
            { name: "Facebook", url: "https://www.facebook.com/" },
          ],
        },
        {
          title: "Other",
          items: [
            { name: "Creator", url: "https://www.dominicclerici.com/" },
            {
              name: "FB Marketplace",
              url: "https://www.facebook.com/marketplace/",
            },
            { name: "Amazon", url: "https://www.amazon.com/" },
          ],
        },
      ],
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.sessionCont}>
        {data.UserShortcuts.map((e, i) => {
          return (
            <div key={"scol" + i} className={styles.shortcutCol}>
              <a className={styles.shortcutTitle}>{e.title}</a>
              <div className={styles.shortcuts}>
                {e.items.map((e, i2) => {
                  return (
                    <a
                      key={"sh" + i + i2}
                      href={e.url}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={styles.shortcutCont}>
                        <Image
                          src={
                            e.url === "https://example.com"
                              ? globe
                              : `https://s2.googleusercontent.com/s2/favicons?domain=${e.url}&sz=32`
                          }
                          width="20"
                          height="20"
                          alt="shortcut favicon"
                        ></Image>
                        <div>{e.name}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
        {data.UserShortcuts.length == 0 && <ErrorMsg></ErrorMsg>}
      </div>
    </div>
  )
}

export default Shortcuts
