// IPFS client for storing and retrieving data
import { create, type IPFSHTTPClient } from "ipfs-http-client"

// IPFS configuration
const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ""
const INFURA_PROJECT_SECRET = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET || ""

// Authorization for Infura IPFS
const auth = "Basic " + Buffer.from(INFURA_PROJECT_ID + ":" + INFURA_PROJECT_SECRET).toString("base64")

// Create IPFS client
let ipfsClient: IPFSHTTPClient | undefined

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
  ipfsClient = undefined
}

// Upload file to IPFS
export const uploadFileToIPFS = async (file: File): Promise<string> => {
  if (!ipfsClient) throw new Error("IPFS client not initialized")

  try {
    const added = await ipfsClient.add(file, {
      progress: (prog) => console.log(`Uploading file: ${prog}`),
    })

    const url = `https://ipfs.infura.io/ipfs/${added.path}`
    return url
  } catch (error) {
    console.error("Error uploading file to IPFS:", error)
    throw error
  }
}

// Upload JSON metadata to IPFS
export const uploadJSONToIPFS = async (jsonData: any): Promise<string> => {
  if (!ipfsClient) throw new Error("IPFS client not initialized")

  try {
    const data = JSON.stringify(jsonData)
    const added = await ipfsClient.add(data)

    const url = `https://ipfs.infura.io/ipfs/${added.path}`
    return url
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error)
    throw error
  }
}

// Get data from IPFS
export const getFromIPFS = async (cid: string): Promise<any> => {
  if (!ipfsClient) throw new Error("IPFS client not initialized")

  try {
    const stream = ipfsClient.cat(cid)
    let data = ""

    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk)
    }

    return JSON.parse(data)
  } catch (error) {
    console.error("Error getting data from IPFS:", error)
    throw error
  }
}

// Create product metadata and upload to IPFS
export const createProductMetadata = async (
  productData: any,
  imageFile: File,
): Promise<{ metadataUrl: string; imageUrl: string }> => {
  try {
    // Upload image first
    const imageUrl = await uploadFileToIPFS(imageFile)

    // Create metadata with image URL
    const metadata = {
      name: productData.name,
      description: productData.description,
      image: imageUrl,
      attributes: [
        { trait_type: "Category", value: productData.category },
        { trait_type: "Price", value: productData.price },
        { trait_type: "Seller", value: productData.seller },
        { trait_type: "Created", value: new Date().toISOString() },
      ],
      // Additional product details
      details: {
        ...productData,
      },
    }

    // Upload metadata to IPFS
    const metadataUrl = await uploadJSONToIPFS(metadata)

    return { metadataUrl, imageUrl }
  } catch (error) {
    console.error("Error creating product metadata:", error)
    throw error
  }
}

