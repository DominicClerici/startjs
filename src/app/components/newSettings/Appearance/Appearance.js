import { useState } from "react"
import Image from "next/image"
import tick from "../../../images/tick.png"
import styles from "./Appearance.module.css"
import { Toggle } from "../controls"

const Selector = ({ label, explainer, set, val, options, target }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.toggleContainer}>
      <div className={styles.labelContainer}>
        <a className={styles.label}>{label}</a>
        {explainer && <a className={styles.explainer}>{explainer}</a>}
      </div>
      <div className={styles.selectorContainer}>
        <div
          className={`${styles.currentlySelected}  ${isOpen && styles.open}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <a>{val}</a>
          <Image src={tick} height={20} width={20} alt="Menu toggle"></Image>
        </div>
        <ul className={`${styles.optionsDropdown} ${isOpen && styles.open}`}>
          {options.map((e, i) => {
            if (e != val) {
              return (
                <li
                  id="dropdown"
                  onClick={() => {
                    set((prev) => ({
                      ...prev,
                      [target]: e,
                    }))
                    setIsOpen(false)
                  }}
                  key={"op" + i}
                >
                  {e}
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

const PickerWindow = ({ label, explainer, set, val, options, target }) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(val)
  return (
    <>
      <div className={styles.toggleContainer}>
        <div className={styles.labelContainer}>
          <a className={styles.label}>{label}</a>
          {explainer && <a className={styles.explainer}>{explainer}</a>}
        </div>
        <button
          className={`button ${styles.button}`}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <div style={{ background: val }} className={styles.current}></div>
          Change
        </button>
      </div>
      {isOpen && (
        <div className={styles.window}>
          <div className={styles.gridContainer}>
            {options.map((e, i) => {
              return (
                <div
                  key={"col" + i}
                  onClick={() => {
                    set((prev) => ({
                      ...prev,
                      [target]: e,
                    }))
                  }}
                  className={`${styles.option} ${e == val && styles.selected}`}
                  style={{ background: e }}
                ></div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

const Appearance = ({ settings, setSettingsA }) => {
  let grads = []
  let accents = [
    "#ff0000",
    "#ff8700",
    "#00ffb3",
    "#13d1ff",
    "#004cff",
    "#6610f2",
    "#f20089",
    "#9a8c98",
  ]
  let colors = []
  if (settings.darkMode) {
    grads = [
      "linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
      "linear-gradient(45deg, rgba(81,49,142,1) 0%, rgba(31,131,100,1) 100%)",
      "linear-gradient(45deg, rgba(82,115,203,1) 0%, rgba(31,16,97,1) 100%)",
      "linear-gradient(45deg, #283c86 0%, #8445a2 100%)",
      "linear-gradient(45deg, rgba(100,43,115,1) 0%, rgba(4,0,4,1) 100%)",
      "linear-gradient(45deg, rgba(129,29,29,1) 0%, rgba(186,122,32,1) 100%)",
      "linear-gradient(45deg, rgba(125,129,29,1) 0%, rgba(157,22,92,1) 100%)",
      "linear-gradient(45deg, rgba(105,72,86,1) 0%, rgba(62,80,101,1) 100%)",
    ]
    colors = [
      "#490000",
      "#4a2419",
      "#14452f",
      "#033933",
      "#0b525b",
      "#000f44",
      "#4d194d",
      "#3b4252",
    ]
  } else {
    grads = [
      "linear-gradient(45deg, rgba(255,199,223,1) 0%, rgba(156,200,252,1) 100%)",
      "linear-gradient(45deg, rgba(238,199,255,1) 0%, rgba(165,156,252,1) 100%)",
      "linear-gradient(45deg, rgba(201,255,199,1) 0%, rgba(156,239,252,1) 100%)",
      "linear-gradient(45deg, rgba(250,255,199,1) 0%, rgba(252,203,156,1) 100%)",
      "linear-gradient(45deg, rgba(245,199,255,1) 0%, rgba(252,156,156,1) 100%)",
      "linear-gradient(45deg, rgba(206,203,255,1) 0%, rgba(186,255,172,1) 100%)",
      "linear-gradient(45deg, rgba(203,215,255,1) 0%, rgba(176,178,217,1) 100%)",
      "linear-gradient(45deg, rgba(219,219,219,1) 0%, rgba(156,156,156,1) 100%)",
    ]
    colors = [
      "#ff5757",
      "#ff9d57",
      "#cbff57",
      "#57ffb7",
      "#57c0ff",
      "#b457ff",
      "#ff57c6",
      "#e6e6e6",
    ]
  }

  return (
    <>
      <Toggle
        label="Dark mode"
        val={settings.darkMode}
        set={setSettingsA}
        target={"darkMode"}
      ></Toggle>
      <Toggle
        label="Animations"
        val={settings.animations}
        set={setSettingsA}
        target={"animations"}
      ></Toggle>
      <PickerWindow
        label="Accent color"
        options={accents}
        val={settings.accentColor}
        set={setSettingsA}
        target={"accentColor"}
      ></PickerWindow>
      <Selector
        label="Background type"
        options={["Solid color", "Gradient"]}
        val={settings.backgroundType}
        set={setSettingsA}
        target={"backgroundType"}
      ></Selector>
      {settings.backgroundType == "Solid color" && (
        <PickerWindow
          label="Background"
          options={colors}
          val={
            settings.darkMode
              ? settings.backgroundColorDark
              : settings.backgroundColorLight
          }
          set={setSettingsA}
          target={
            settings.darkMode ? "backgroundColorDark" : "backgroundColorLight"
          }
        ></PickerWindow>
      )}
      {settings.backgroundType == "Gradient" && (
        <PickerWindow
          label="Background"
          options={grads}
          val={
            settings.darkMode
              ? settings.backgroundGradientDark
              : settings.backgroundGradientLight
          }
          set={setSettingsA}
          target={
            settings.darkMode
              ? "backgroundGradientDark"
              : "backgroundGradientLight"
          }
        ></PickerWindow>
      )}
    </>
  )
}

export default Appearance
