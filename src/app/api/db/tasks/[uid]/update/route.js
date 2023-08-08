import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

export async function POST(req, { params }) {
  const userId = params.uid
  const body = await req.json()
  let prismaData
  try {
    if (body.id) {
      prismaData = await prisma.userTasks.update({
        where: {
          id: body.id,
          userId: userId,
        },
        data: {
          ...body,
        },
      })
    } else {
      prismaData = await prisma.userTasks.create({
        data: {
          userId: userId,
          ...body,
        },
      })
    }
    if (prismaData === null) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    } else if (typeof prismaData === "object") {
      return NextResponse.json(prismaData)
    }
  } catch (error) {
    return NextResponse.json({ error: "Record not found" }, { status: 400 })
  }
}

// ! make sure all endpoints work and then add the functions to the frontend to handle them.
// ! finally start building the ui for it
