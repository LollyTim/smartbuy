import { NextResponse } from "next/server"
import { uploadFileToIPFS } from "@/lib/ipfs/ipfs-client"
import { Buffer } from "buffer"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to IPFS using our client
    const fileArrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(fileArrayBuffer)

    // Create a File object from the buffer
    const fileObj = new File([fileBuffer], file.name, { type: file.type })

    // Upload to IPFS
    const url = await uploadFileToIPFS(fileObj)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error uploading to IPFS:", error)
    return NextResponse.json({ error: "Failed to upload to IPFS" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "IPFS API is running" }, { status: 200 })
}

