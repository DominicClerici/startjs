import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

export async function GET(req, { params }) {
  const userId = params.uid
  let prismaData
  try {
    prismaData = await prisma.userTasks.deleteMany({
      where: {
        userId: userId,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Record not found" }, { status: 400 })
  }
  return NextResponse.json(prismaData)
}

// localhost:3000/api/db/settings/clklvxkt70000ub40bl1hk9uu/get
// localhost:3000/api/db/settings/[ uid ]/get
