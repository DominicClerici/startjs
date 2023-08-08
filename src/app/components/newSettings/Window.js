"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./Settings.module.css"
import path from "../../utils/basepath"
import Image from "next/image"
import Appearance from "./Appearance/Appearance"
import settingsIcon from "../../images/settings.png"
import closeIcon from "../../images/close_large.png"
import Accordion from "./Accordion"
import Shortcuts from "./Shortcuts/Shortcuts"
import { signOut } from "next-auth/react"
import { createErrorMessage } from "../../Message"

const getSettings = (id, set) => {
  fetch(path + `/api/db/settings/${id}/get`)
    .then((res) => {
      if (res.status == 200) {
        return res.json()
      }
    })
    .then((data) => {
      set(data.settings)
    })
}

const getShortcuts = (id, set) => {
  fetch(path + `/api/db/shortcuts/${id}/get`)
    .then((res) => {
      if (res.status == 200) {
        return res.json()
      }
    })
    .then((data) => {
      set(data.UserShortcuts)
    })
}

const Window = ({ uid }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState(undefined)
  const [shortcuts, setShortcuts] = useState(undefined)
  const [hasChanged, setHasChanged] = useState(false)
  const windowRef = useRef(null)
  const openerRef = useRef(null)

  const SaveFunc = (shortcuts, settings) => {
    let fi = false
    let se = false
    fetch(`${path}/api/db/shortcuts/${uid}/update`, {
      method: "POST",
      body: JSON.stringify(shortcuts),
    }).then((res) => {
      if (res.status == 200) {
        fi = true
        if (fi && se) {
          createErrorMessage(
            5,
            "Saved settings successfully!",
            "Reloading now.",
            "general"
          )
        }
        setTimeout(() => {
          location.reload()
        }, 500)
      }
    })
    fetch(`${path}/api/db/settings/${uid}/update`, {
      method: "POST",
      body: JSON.stringify(settings),
    }).then((res) => {
      if (res.status == 200) {
        se = true
        if (fi && se) {
          createErrorMessage(
            5,
            "Saved settings successfully",
            undefined,
            "general"
          )
        }
      }
    })
  }

  useEffect(() => {
    if (isOpen) {
      document.getElementById("sideMove").classList.add("left")
    } else {
      document.getElementById("sideMove").classList.remove("left")
    }
  }, [isOpen])

  const setSettingsA = (e) => {
    setSettings(e)
    if (!hasChanged) {
      setHasChanged(true)
    }
  }
  const setShortcutsA = (e) => {
    setShortcuts(e)
    if (!hasChanged) {
      setHasChanged(true)
    }
  }

  useEffect(() => {
    getSettings(uid, setSettings)
    getShortcuts(uid, setShortcuts)
  }, [])
  if (settings && shortcuts) {
    return (
      <>
        <div
          className={`${styles.clickHandler} ${isOpen && styles.open}`}
          onClick={() => setIsOpen(false)}
        ></div>
        <div
          ref={openerRef}
          onClick={() => {
            setIsOpen(true)
          }}
          className={`${styles.openerButton} ${isOpen && styles.open}`}
        >
          <Image
            src={settingsIcon}
            height="60"
            width="60"
            alt="settings icon"
          ></Image>
        </div>
        <div
          ref={windowRef}
          className={`${styles.window} ${isOpen && styles.open}`}
        >
          <div className={styles.fixedHeader}>
            <button
              className={`button ${styles.saveButton} ${
                hasChanged && styles.changed
              }`}
              onClick={() => {
                SaveFunc(shortcuts, settings)
              }}
            >
              Save changes
            </button>
            <Image
              onClick={() => {
                setIsOpen(false)
              }}
              src={closeIcon}
              width={60}
              height={60}
              alt="close icon"
              className={`icon ${styles.closeIcon}`}
            ></Image>
          </div>
          <div className={`betterScroll ${styles.contentContainer}`}>
            <Accordion title={"Appearance"}>
              <Appearance
                settings={settings}
                setSettingsA={setSettingsA}
              ></Appearance>
            </Accordion>
            <Accordion title={"Shortcuts"}>
              <Shortcuts data={shortcuts} set={setShortcutsA}></Shortcuts>
            </Accordion>
            <button
              className={`button ${styles.logoutButton}`}
              onClick={() => {
                signOut()
              }}
            >
              Log out.
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Window
