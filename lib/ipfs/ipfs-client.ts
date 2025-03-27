"use client";

import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { Buffer } from "buffer";

// Polyfill Buffer for browser
if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}

let helia: any = null;
let fs: any = null;

export async function getIpfsClient() {
  if (typeof window === "undefined") {
    throw new Error("IPFS client can only be used in the browser");
  }

  if (!helia) {
    helia = await createHelia();
    fs = unixfs(helia);
  }
  return { helia, fs };
}

export async function uploadToIpfs(file: File) {
  if (typeof window === "undefined") {
    throw new Error("IPFS upload can only be used in the browser");
  }

  try {
    const { fs } = await getIpfsClient();
    const buffer = await file.arrayBuffer();
    const cid = await fs.add(Buffer.from(buffer));
    return `https://ipfs.io/ipfs/${cid}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}

export async function uploadMetadata(metadata: any) {
  if (typeof window === "undefined") {
    throw new Error("IPFS upload can only be used in the browser");
  }

  try {
    const { fs } = await getIpfsClient();
    const buffer = Buffer.from(JSON.stringify(metadata));
    const cid = await fs.add(buffer);
    return `https://ipfs.io/ipfs/${cid}`;
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw error;
  }
}

// Upload file to IPFS
export const uploadFileToIPFS = async (file: File): Promise<string> => {
  if (typeof window === "undefined") {
    throw new Error("IPFS upload can only be used in the browser");
  }

  try {
    const { fs } = await getIpfsClient();
    const buffer = await file.arrayBuffer();
    const cid = await fs.add(Buffer.from(buffer));
    return `https://ipfs.io/ipfs/${cid}`;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};

// Upload JSON metadata to IPFS
export const uploadJSONToIPFS = async (jsonData: any): Promise<string> => {
  if (typeof window === "undefined") {
    throw new Error("IPFS upload can only be used in the browser");
  }

  try {
    const { fs } = await getIpfsClient();
    const data = JSON.stringify(jsonData);
    const cid = await fs.add(Buffer.from(data));
    return `https://ipfs.io/ipfs/${cid}`;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw error;
  }
};

// Get data from IPFS
export const getFromIPFS = async (cid: string): Promise<any> => {
  if (typeof window === "undefined") {
    throw new Error("IPFS operations can only be used in the browser");
  }

  try {
    const { fs } = await getIpfsClient();
    const data = await fs.cat(cid);
    return JSON.parse(new TextDecoder().decode(data));
  } catch (error) {
    console.error("Error getting data from IPFS:", error);
    throw error;
  }
};

// Create product metadata and upload to IPFS
export const createProductMetadata = async (
  productData: any,
  imageFile: File
): Promise<{ metadataUrl: string; imageUrl: string }> => {
  if (typeof window === "undefined") {
    throw new Error("IPFS operations can only be used in the browser");
  }

  try {
    // Upload image first
    const imageUrl = await uploadFileToIPFS(imageFile);

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
    };

    // Upload metadata to IPFS
    const metadataUrl = await uploadJSONToIPFS(metadata);

    return { metadataUrl, imageUrl };
  } catch (error) {
    console.error("Error creating product metadata:", error);
    throw error;
  }
};
