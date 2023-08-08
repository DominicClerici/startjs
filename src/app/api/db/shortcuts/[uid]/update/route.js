import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

export async function POST(req, { params }) {
  const userId = params.uid
  const body = await req.json()
  let prismaData
  try {
    let currentData = await prisma.userShortcuts.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    })
    console.log(currentData)
    let ids = currentData.map((e) => e.id)
    let createArr
    let deleteArr
    let updArr
    body.forEach(async (e) => {
      if (e.id) {
        if (ids.includes(e.id)) {
          updArr = await prisma.userShortcuts.update({
            where: {
              userId: userId,
              id: e.id,
            },
            data: {
              ...e,
            },
          })
        }
      } else {
        createArr = await prisma.userShortcuts.create({
          data: {
            userId: userId,
            ...e,
          },
        })
      }
    })
    if (ids.length !== body.length) {
      body.forEach((e) => {
        let ind = ids.indexOf(e.id)
        if (ind > -1) {
          ids.splice(ind, 1)
        }
      })
      ids.forEach(async (e) => {
        deleteArr = await prisma.userShortcuts.delete({
          where: {
            userId: userId,
            id: e,
          },
        })
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Record not found" }, { status: 400 })
  }
  return NextResponse.json({ message: "success" })
}

// data in body needs to exactly match prisma schema
// dont send id when creating new shortcut col
