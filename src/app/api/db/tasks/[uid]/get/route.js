import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

export async function GET(req, { params }) {
  const userId = params.uid
  const prismaData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      UserTasks: true,
    },
  })
  if (prismaData === null) {
    return NextResponse.json({ error: "User not found" }, { status: 400 })
  } else if (typeof prismaData === "object") {
    return NextResponse.json(prismaData)
  }
}

// localhost:3000/api/db/settings/clklvxkt70000ub40bl1hk9uu/get
// localhost:3000/api/db/settings/[ uid ]/get
