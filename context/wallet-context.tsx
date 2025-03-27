"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast, useToast } from "@/components/ui/use-toast"
import {
  connectCardanoWallet,
  getWalletAddress,
  getWalletBalance,
  getAvailableWallets,
  type WalletAPI,
  checkNetwork,
} from "@/lib/cardano/wallet-connector"
import { createPaymentTransaction, mintProductNFT } from "@/lib/cardano/transaction-builder"
import { createProductMetadata } from "@/lib/ipfs/ipfs-client"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  walletAPI: WalletAPI | null
  availableWallets: string[]
  isPreviewNetwork: boolean
  isLoading: boolean
  connectWallet: (walletName: string) => Promise<void>
  disconnectWallet: () => void
  sendTransaction: (to: string, amount: number) => Promise<boolean>
  mintNFT: (metadata: any, imageFile: File) => Promise<string | null>
  createAuction: (productId: string, startingPrice: number, duration: number) => Promise<string | null>
  placeBid: (auctionId: string, amount: number) => Promise<boolean>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [walletAPI, setWalletAPI] = useState<WalletAPI | null>(null)
  const [availableWallets, setAvailableWallets] = useState<string[]>([])
  const [isPreviewNetwork, setIsPreviewNetwork] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Check for available wallets on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wallets = getAvailableWallets()
      setAvailableWallets(wallets)
    }
  }, [])

  // Restore wallet connection on page load
  useEffect(() => {
    let isMounted = true
    const savedWalletName = localStorage.getItem("connectedWallet")
    const savedAddress = localStorage.getItem("walletAddress")
    const savedBalance = localStorage.getItem("walletBalance")

    if (savedWalletName && savedAddress && savedBalance) {
      // Restore saved state
      setAddress(savedAddress)
      setBalance(Number(savedBalance))
      setIsConnected(true)

      // Reconnect to wallet
      const reconnectWallet = async () => {
        try {
          const api = await connectCardanoWallet(savedWalletName)
          if (!api) {
            throw new Error(`Failed to reconnect to ${savedWalletName} wallet.`)
          }

          // Verify the connection is still valid
          const currentAddress = await getWalletAddress(api)
          const currentBalance = await getWalletBalance(api)

          if (isMounted) {
            setWalletAPI(api)
            setAddress(currentAddress)
            setBalance(currentBalance)
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Failed to reconnect wallet:", error)
          // Clear saved state if reconnection fails
          localStorage.removeItem("connectedWallet")
          localStorage.removeItem("walletAddress")
          localStorage.removeItem("walletBalance")
          if (isMounted) {
            setIsConnected(false)
            setAddress(null)
            setBalance(0)
            setWalletAPI(null)
          }
        }
      }

      reconnectWallet()
    }

    return () => {
      isMounted = false
    }
  }, [])

  const connectWallet = async (walletName: string) => {
    setIsLoading(true)
    try {
      const api = await connectCardanoWallet(walletName)
      if (!api) {
        throw new Error("Failed to connect to wallet")
      }

      // Get wallet address
      const walletAddress = await getWalletAddress(api)
      setAddress(walletAddress)

      // Check network
      const isPreview = await checkNetwork(api)
      setIsPreviewNetwork(isPreview)

      if (!isPreview) {
        toast({
          title: "Wrong Network",
          description: "Please switch to Cardano Preview Network in your wallet settings.",
          variant: "destructive",
        })
      }

      // Get initial balance
      const walletBalance = await getWalletBalance(api)
      setBalance(walletBalance)

      setWalletAPI(api)
      setIsConnected(true)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to wallet",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
    setWalletAPI(null)
    localStorage.removeItem("connectedWallet")
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")

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
      localStorage.setItem("walletBalance", newBalance.toString())

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

  const createAuction = async (
    productId: string,
    startingPrice: number,
    duration: number
  ): Promise<string | null> => {
    try {
      if (!walletAPI || !address) {
        throw new Error("Wallet not connected")
      }

      // In a real implementation, this would create an auction using the auction smart contract
      // For this demo, we'll simulate creating an auction

      // Simulate auction creation delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const auctionId = `auction_${productId}_${Date.now()}`
      toast({
        title: "Auction Created Successfully",
        description: `Your auction has been created with ID: ${auctionId.substring(0, 15)}...`,
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
    isPreviewNetwork,
    isLoading,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    mintNFT,
    createAuction,
    placeBid,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

