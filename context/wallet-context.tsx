"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"
import {
  connectCardanoWallet,
  getWalletAddress,
  getWalletBalance,
  getAvailableWallets,
  type WalletAPI,
} from "@/lib/cardano/wallet-connector"
import { createPaymentTransaction, mintProductNFT } from "@/lib/cardano/transaction-builder"
import { createProductMetadata } from "@/lib/ipfs/ipfs-client"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  walletAPI: WalletAPI | null
  availableWallets: string[]
  connectWallet: (walletName?: string) => Promise<boolean>
  disconnectWallet: () => void
  sendTransaction: (to: string, amount: number) => Promise<boolean>
  mintNFT: (metadata: any, imageFile: File) => Promise<string | null>
  createAuction: (productId: string, startingPrice: number, duration: number) => Promise<string | null>
  placeBid: (auctionId: string, amount: number) => Promise<boolean>
}

// Change the context creation to use null as the default value instead of functions
// This avoids creating new function instances on every render

const WalletContext = createContext<WalletContextType | null>(null)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [walletAPI, setWalletAPI] = useState<WalletAPI | null>(null)
  const [availableWallets, setAvailableWallets] = useState<string[]>([])

  // Check for available wallets on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wallets = getAvailableWallets()
      setAvailableWallets(wallets)
    }
  }, [])

  // Fix the useEffect hook that might be causing the Fiber error
  // by adding proper cleanup and preventing state updates after unmounting

  // Replace the useEffect for wallet connection with this improved version:
  useEffect(() => {
    let isMounted = true
    const savedWalletName = localStorage.getItem("connectedWallet")

    if (savedWalletName) {
      // Use an async function inside the effect
      const connectSavedWallet = async () => {
        try {
          // If no wallet name provided, use the first available wallet
          const walletToConnect = savedWalletName || availableWallets[0]

          if (!walletToConnect) {
            return
          }

          // Connect to wallet
          const api = await connectCardanoWallet(walletToConnect)

          if (!api) {
            throw new Error(`Failed to connect to ${walletToConnect} wallet.`)
          }

          // Get wallet address
          const addr = await getWalletAddress(api)

          // Get wallet balance
          const bal = await getWalletBalance(api)

          // Only update state if component is still mounted
          if (isMounted) {
            setWalletAPI(api)
            setAddress(addr)
            setBalance(bal)
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Failed to connect wallet:", error)
        }
      }

      connectSavedWallet()
    }

    // Cleanup function to prevent state updates after unmounting
    return () => {
      isMounted = false
    }
  }, [availableWallets]) // Add availableWallets as a dependency

  // Also update the connectWallet function to handle errors better
  const connectWallet = async (walletName?: string): Promise<boolean> => {
    try {
      // If no wallet name provided, use the first available wallet
      const walletToConnect = walletName || availableWallets[0]

      if (!walletToConnect) {
        toast({
          title: "No Wallet Available",
          description: "Please install a Cardano wallet extension like Nami, Eternl, or Flint.",
          variant: "destructive",
        })
        return false
      }

      // Connect to wallet - use the renamed function here
      const api = await connectCardanoWallet(walletToConnect)

      if (!api) {
        throw new Error(`Failed to connect to ${walletToConnect} wallet.`)
      }

      // Get wallet address
      const addr = await getWalletAddress(api)

      // Get wallet balance
      const bal = await getWalletBalance(api)

      // Update state
      setWalletAPI(api)
      setAddress(addr)
      setBalance(bal)
      setIsConnected(true)

      // Save connected wallet to localStorage
      localStorage.setItem("connectedWallet", walletToConnect)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletToConnect} wallet.`,
      })

      return true
    } catch (error) {
      console.error("Failed to connect wallet:", error)

      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })

      return false
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
    setWalletAPI(null)
    localStorage.removeItem("connectedWallet")

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const sendTransaction = async (to: string, amount: number): Promise<boolean> => {
    try {
      if (!walletAPI) {
        throw new Error("Wallet not connected")
      }

      if (balance < amount) {
        toast({
          title: "Insufficient Balance",
          description: "You don't have enough ADA to complete this transaction.",
          variant: "destructive",
        })
        return false
      }

      // Convert ADA to lovelace (1 ADA = 1,000,000 lovelace)
      const lovelaceAmount = amount * 1000000

      // Create and submit transaction
      const txHash = await createPaymentTransaction(walletAPI, to, lovelaceAmount)

      // Update balance
      const newBalance = await getWalletBalance(walletAPI)
      setBalance(newBalance)

      toast({
        title: "Transaction Successful",
        description: `Successfully sent ${amount} ₳ to ${to.substring(0, 8)}...`,
      })

      return true
    } catch (error) {
      console.error("Transaction failed:", error)

      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Failed to complete the transaction. Please try again.",
        variant: "destructive",
      })

      return false
    }
  }

  const mintNFT = async (metadata: any, imageFile: File): Promise<string | null> => {
    try {
      if (!walletAPI || !address) {
        throw new Error("Wallet not connected")
      }

      // Upload metadata and image to IPFS
      const { metadataUrl, imageUrl } = await createProductMetadata(metadata, imageFile)

      // Add image URL to metadata
      const productData = {
        ...metadata,
        image: imageUrl,
      }

      // Mint NFT
      const { txHash, assetId } = await mintProductNFT(walletAPI, productData, metadataUrl)

      toast({
        title: "NFT Minted Successfully",
        description: `Your NFT has been minted with asset ID: ${assetId.substring(0, 15)}...`,
      })

      return assetId
    } catch (error) {
      console.error("NFT minting failed:", error)

      toast({
        title: "NFT Minting Failed",
        description: error instanceof Error ? error.message : "Failed to mint the NFT. Please try again.",
        variant: "destructive",
      })

      return null
    }
  }

  const createAuction = async (productId: string, startingPrice: number, duration: number): Promise<string | null> => {
    try {
      if (!walletAPI || !address) {
        throw new Error("Wallet not connected")
      }

      // In a real implementation, this would create an auction using the auction smart contract
      // For this demo, we'll simulate creating an auction

      // Simulate auction creation delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock auction ID
      const auctionId = `auction${Math.random().toString(36).substring(2, 15)}`

      toast({
        title: "Auction Created Successfully",
        description: `Your auction has been created with ID: ${auctionId.substring(0, 10)}...`,
      })

      return auctionId
    } catch (error) {
      console.error("Auction creation failed:", error)

      toast({
        title: "Auction Creation Failed",
        description: error instanceof Error ? error.message : "Failed to create the auction. Please try again.",
        variant: "destructive",
      })

      return null
    }
  }

  const placeBid = async (auctionId: string, amount: number): Promise<boolean> => {
    try {
      if (!walletAPI || !address) {
        throw new Error("Wallet not connected")
      }

      if (balance < amount) {
        toast({
          title: "Insufficient Balance",
          description: "You don't have enough ADA to place this bid.",
          variant: "destructive",
        })
        return false
      }

      // In a real implementation, this would place a bid using the auction smart contract
      // For this demo, we'll simulate placing a bid

      // Simulate bid processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Bid Placed Successfully",
        description: `Your bid of ${amount} ₳ has been placed on auction ${auctionId.substring(0, 10)}...`,
      })

      return true
    } catch (error) {
      console.error("Bid placement failed:", error)

      toast({
        title: "Bid Failed",
        description: error instanceof Error ? error.message : "Failed to place the bid. Please try again.",
        variant: "destructive",
      })

      return false
    }
  }

  const value = {
    isConnected,
    address,
    balance,
    walletAPI,
    availableWallets,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    mintNFT,
    createAuction,
    placeBid,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

