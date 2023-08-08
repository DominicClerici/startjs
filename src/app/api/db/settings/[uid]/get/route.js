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
      settings: true,
    },
  })
  if (prismaData === null) {
    return NextResponse.json({ error: "User not found" }, { status: 400 })
  } else if (typeof prismaData === "object") {
    if (prismaData.name && !prismaData.settings) {
      const createdTable = await prisma.userSettings.create({
        data: {
          userId: userId,
        },
      })
      console.log("created new table")
    }
    return NextResponse.json(prismaData)
  }
}

// localhost:3000/api/db/settings/clklvxkt70000ub40bl1hk9uu/get
// localhost:3000/api/db/settings/[ uid ]/get
