"use client"
import { useEffect, useRef, useState } from "react"
import Searchresults from "./Searchresults"
import styles from "./Searchbar.module.css"

const Searchbar = () => {
  const [searchVal, setSearchVal] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const searchRef = useRef(null)
  const resultsRef = useRef(null)

  const typeHandler = (e) => {
    let val = e.target.value.trim()
    setHoveredIndex(0)
    setSearchVal(val)
    if (val != "") {
      let elToApp = document.getElementById("externalSearchScript")
      if (elToApp) {
        document.head.removeChild(elToApp)
      }
      elToApp = document.createElement("script")
      elToApp.src = `https://www.google.com/complete/search?client=chrome&q=${val}&callback=getSuggestions`
      elToApp.async = true
      elToApp.id = "externalSearchScript"
      document.head.appendChild(elToApp)
    } else {
      setShowResults(false)
    }
  }

  useEffect(() => {
    if (focused) {
      searchRef.current.focus()
      searchRef.current.value = searchRef.current.value.trim()
      document.getElementById("searchMove").classList.add("moved")
    } else {
      searchRef.current.value = searchRef.current.value.trim()
      searchRef.current.blur()
      setShowResults(false)
      setHoveredIndex(0)
      document.getElementById("searchMove").classList.remove("moved")
    }
  }, [focused])

  const callback = () => {
    let vals = document
      .getElementById("watch")
      .innerText.split(",")
      .filter((de) => {
        return de.startsWith(searchVal.trim())
      })
      .slice(0, 8)
      .filter((e) => e !== "")
      .filter((e) => e !== "[object Object]")
    setResults(vals)
    setShowResults(true)
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
        // &&
        // resultsRef.current &&
        // !resultsRef.current.contains(e.target)
      ) {
        setFocused(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [searchRef])

  const handleType = (e) => {
    if (
      document.getElementById("sideMove").classList.contains("left") ||
      document.getElementById("sideMove").classList.contains("right")
    ) {
    } else {
      if (e.key == "Enter") {
        if (document.activeElement === searchRef.current) {
          if (searchVal.trim() == "") {
            setFocused(false)
          } else {
            window.location.href = `https://www.google.com/search?q=${results[hoveredIndex]}`
          }
        } else {
          setFocused(true)
        }
      } else if (e.key == "ArrowUp") {
        if (hoveredIndex != 0) {
          setHoveredIndex(hoveredIndex - 1)
        }
      } else if (e.key == "ArrowDown") {
        if (hoveredIndex != results.length - 1) {
          setHoveredIndex(hoveredIndex + 1)
        }
      } else if (e.key == " ") {
        if (document.activeElement !== searchRef.current) {
          setFocused(true)
        }
      } else if (e.key == "Escape") {
        if (document.activeElement === searchRef.current) {
          setFocused(false)
        }
      }
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleType)

    return () => {
      document.removeEventListener("keydown", handleType)
    }
  }, [handleType])

  useEffect(() => {
    const config = {
      characterData: false,
      attributes: false,
      childList: true,
      subtree: false,
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.getElementById("watch"), config)
  }, [])

  return (
    <>
      <div className={`${styles.darken} ${focused && styles.on}`}></div>
      <div className={`${styles.container} ${focused && styles.active}`}>
        <input
          onClick={() => {
            setFocused(true)
          }}
          ref={searchRef}
          onChange={typeHandler}
          className={`${styles.searchBar} ${
            showResults && styles.resultsShown
          }`}
          placeholder="Find something great..."
        ></input>
        <Searchresults
          show={showResults}
          set={setHoveredIndex}
          refToApp={resultsRef}
          hov={hoveredIndex}
          vals={results}
        ></Searchresults>
      </div>
    </>
  )
}

export default Searchbar

// set focus when pressing enter
// set focus when clicking in and out
// set focus when space
