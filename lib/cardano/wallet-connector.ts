// Define wallet API types based on CIP-30 specification
export interface CardanoWallet {
  enable: () => Promise<WalletAPI>
  isEnabled: () => Promise<boolean>
  apiVersion: string
  name: string
  icon: string
}

export interface WalletAPI {
  getNetworkId: () => Promise<number>
  getUtxos: () => Promise<string[] | undefined>
  getBalance: () => Promise<string>
  getUsedAddresses: () => Promise<string[]>
  getUnusedAddresses: () => Promise<string[]>
  getChangeAddress: () => Promise<string>
  getRewardAddresses: () => Promise<string[]>
  signTx: (tx: string, partialSign: boolean) => Promise<string>
  signData: (addr: string, payload: string) => Promise<{ signature: string; key: string }>
  submitTx: (tx: string) => Promise<string>
  getCollateral: () => Promise<string[] | undefined>
}

declare global {
  interface Window {
    cardano?: {
      [key: string]: CardanoWallet
    }
  }
}

// Get available wallets
export const getAvailableWallets = (): string[] => {
  if (typeof window === "undefined") return []

  const wallets: string[] = []
  if (window.cardano) {
    for (const walletName in window.cardano) {
      wallets.push(walletName)
    }
  }
  return wallets
}

// Improve error handling in the wallet connector functions

// Update the connectCardanoWallet function to be more robust
export const connectCardanoWallet = async (walletName: string): Promise<WalletAPI | null> => {
  try {
    if (typeof window === "undefined") return null

    // Check if cardano object exists
    if (!window.cardano) {
      throw new Error("Cardano object not found. Please install a Cardano wallet extension.")
    }

    const wallet = window.cardano[walletName]
    if (!wallet) {
      throw new Error(`${walletName} wallet not found. Please install it.`)
    }

    // Add timeout to prevent hanging
    const walletAPIPromise = wallet.enable()
    const timeoutPromise = new Promise<null>((_, reject) => {
      setTimeout(() => reject(new Error("Wallet connection timed out")), 10000)
    })

    // Race the wallet connection against a timeout
    const walletAPI = (await Promise.race([walletAPIPromise, timeoutPromise])) as WalletAPI
    return walletAPI
  } catch (error) {
    console.error("Error connecting to wallet:", error)
    throw error
  }
}

// Keep the original function name for backward compatibility but make it call the renamed function
export const connectWallet = connectCardanoWallet

// Update the getWalletAddress function to handle errors better
export const getWalletAddress = async (walletAPI: WalletAPI): Promise<string> => {
  try {
    if (!walletAPI || typeof walletAPI.getChangeAddress !== "function") {
      throw new Error("Invalid wallet API")
    }

    const addressHex = await walletAPI.getChangeAddress()
    return addressHex
  } catch (error) {
    console.error("Error getting wallet address:", error)
    throw error
  }
}

// Update the getWalletBalance function to handle errors better
export const getWalletBalance = async (walletAPI: WalletAPI): Promise<number> => {
  try {
    if (!walletAPI || typeof walletAPI.getBalance !== "function") {
      throw new Error("Invalid wallet API")
    }

    const balanceHex = await walletAPI.getBalance()
    return simulateParseBalance(balanceHex)
  } catch (error) {
    console.error("Error getting wallet balance:", error)
    throw error
  }
}

// Simulate parsing balance (in a real implementation, use Cardano Serialization Library)
const simulateParseBalance = (balanceHex: string): number => {
  // This is a placeholder. In a real implementation, you would:
  // 1. Convert hex to Value object using CSL
  // 2. Extract lovelace amount
  // 3. Convert to ADA (divide by 1,000,000)

  // For demo purposes, generate a random balance
  return Math.floor(Math.random() * 1000) + 100
}

