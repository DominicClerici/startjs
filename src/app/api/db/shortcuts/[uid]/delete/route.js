import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

export async function POST(req, { params }) {
  const userId = params.uid
  const body = await req.json()
  let prismaData
  try {
    prismaData = await prisma.userShortcuts.delete({
      where: {
        id: body.id,
        userId: userId,
      },
    })
  } catch (error) {
    if (error.code == "P2025") {
      return NextResponse.json({ error: "Record not found" }, { status: 400 })
    }
  }
  return NextResponse.json(prismaData)
}

// localhost:3000/api/db/settings/clklvxkt70000ub40bl1hk9uu/get
// localhost:3000/api/db/settings/[ uid ]/get
