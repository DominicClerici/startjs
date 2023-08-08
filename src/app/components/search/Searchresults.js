import styles from "./Searchbar.module.css"

const Searchresults = ({ vals, hov, refToApp, set, show }) => {
  return (
    <ul ref={refToApp} className={`${styles.results} ${show && styles.shown}`}>
      {vals.map((e, i) => {
        return (
          <a
            onMouseEnter={() => {
              set(i)
            }}
            href={`https://www.google.com/search?q=${e}`}
            className={hov == i ? styles.hov : null}
            key={"res" + i}
          >
            <li>{e}</li>
          </a>
        )
      })}
    </ul>
  )
}

export default Searchresults
