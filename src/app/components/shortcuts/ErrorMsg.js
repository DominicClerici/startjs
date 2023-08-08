"use client"
import { useEffect } from "react"
import { createErrorMessage } from "../../Message"
const ErrorMsg = () => {
  useEffect(() => {
    createErrorMessage(
      10,
      "You have no shortcuts.",
      "You can create some in settings.",
      "general"
    )
  }, [])

  return <></>
}

export default ErrorMsg
