"use client"
import styles from "./Tasks.module.css"
import { signIn } from "next-auth/react"

const Signin = () => {
  return (
    <button
      onClick={() => {
        signIn("google")
      }}
      className={`button ${styles.signin}`}
    >
      Sign in to use all features.
    </button>
  )
}

export default Signin
