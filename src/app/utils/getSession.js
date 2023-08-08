import { getServerSession } from "next-auth"
import options from "../api/auth/[...nextauth]/options"

const getSession = async () => {
  const session = await getServerSession(options)
  return session
}

export default getSession
