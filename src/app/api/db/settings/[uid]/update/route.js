import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

export async function POST(req, { params }) {
  const userId = params.uid
  console.log(userId)
  const body = await req.json()
  let prismaData
  try {
    prismaData = await prisma.userSettings.upsert({
      where: {
        userId: userId,
      },
      update: {
        ...body,
      },
      create: {
        ...body,
        userId: userId,
      },
    })
  } catch (error) {
    if (error.code == "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }
  }
  if (prismaData === null) {
    return NextResponse.json({ error: "User not found" }, { status: 400 })
  } else if (typeof prismaData === "object") {
    return NextResponse.json(prismaData)
  }
}
