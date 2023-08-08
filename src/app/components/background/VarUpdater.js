"use client"
import { useEffect } from "react"
import path from "../../utils/basepath"

const getData = async (id) => {
  let res = await fetch(`${path}/api/db/settings/${id}/get`)
  if (res.status == 200) {
    return res.json()
  }
}

const disableAnims = () => {
  let sheets = document.styleSheets
  console.log(
    sheets[0].insertRule(
      "*, *::after, *::before{animation: none !important; transition: none !important;}"
    )
  )
}
const setVariables = (vars) =>
  Object.entries(vars).forEach((v) =>
    document.documentElement.style.setProperty(v[0], v[1])
  )

const VarUpdater = ({ uid }) => {
  useEffect(() => {
    getData(uid).then((d) => {
      console.log(d.settings)
      let s = d.settings
      if (!s.animations) {
        disableAnims()
      }
      if (!s.darkMode) {
        const variables = {
          "--text-color-main": "rgb(10,10,10)",
          "--text-color-second": "rgb(25,25,25)",
          "--text-color-accent": "rgb(50,50,50)",
          "--darker-panel": "rgba(255,255,255,.7)",
          "--dark-panel": "rgba(255,255,255,.5)",
          "--med-panel": "rgba(255,255,255,.3)",
          "--panel-interactable": "rgba(0,0,0,.15)",
          "--panel-interactable-hover": "rgba(0,0,0,.2)",
          "--panel-interactable-opaque": "rgba(180,180,180,1)",
          "--search-noFocus": "rgb(120,120,120)",
          "--black-icon-invert": "invert(.3)",
          "--black-icon-invert-hover": "invert(0)",
        }
        setVariables(variables)
      }
      document.documentElement.style.setProperty(
        "--color-highlight",
        s.accentColor
      )
    })
  }, [])

  return <></>
}

export default VarUpdater
