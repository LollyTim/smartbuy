import { NextResponse } from "next/server"
import { create } from "ipfs-http-client"

// IPFS configuration
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || ""
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET || ""

// Authorization for Infura IPFS
const auth = "Basic " + Buffer.from(INFURA_PROJECT_ID + ":" + INFURA_PROJECT_SECRET).toString("base64")

// Create IPFS client
let ipfsClient
try {
  ipfsClient = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  })
} catch (error) {
  console.error("IPFS client error:", error)
}

export async function POST(request: Request) {
  try {
    if (!ipfsClient) {
      return NextResponse.json({ error: "IPFS client not initialized" }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to IPFS
    const result = await ipfsClient.add(buffer)
    const ipfsUrl = `https://ipfs.infura.io/ipfs/${result.path}`

    return NextResponse.json({ url: ipfsUrl })
  } catch (error) {
    console.error("Error uploading to IPFS:", error)
    return NextResponse.json({ error: "Failed to upload to IPFS" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "IPFS API is running" }, { status: 200 })
}

