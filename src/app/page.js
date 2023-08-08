import InitialBackground from "./components/background/InitialBackground"
import Shortcuts from "./components/shortcuts/Shortcuts"
import Searchbar from "./components/search/Searchbar"
import Settings from "./components/newSettings/Settings"
import Tasks from "./components/tasks/Tasks"

import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div id="mesCont"></div>
      <div id="noAnims"></div>
      {/* everything here is on initial load */}
      <InitialBackground></InitialBackground>
      {/* <div id="shouldMove">
          <Heading></Heading> 
        </div> */}
      <Tasks></Tasks>
      <div id="sideMove">
        <Searchbar></Searchbar>
        <div id="searchMove">
          <Shortcuts></Shortcuts>
        </div>
      </div>
      <Settings></Settings>
      {/* everything here is for client load or fetch */}
    </main>
  )
}
