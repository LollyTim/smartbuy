import { Transaction } from "@meshsdk/core"
import type { Wallet } from "@meshsdk/core"

// Create a simple payment transaction
export const createPaymentTransaction = async (
  wallet: Wallet,
  recipientAddress: string,
  amountLovelace: number,
): Promise<string> => {
  try {
    // Create a transaction
    const tx = new Transaction({ initiator: wallet })

    // Send lovelace to the recipient
    tx.sendLovelace(recipientAddress, amountLovelace.toString())

    // Sign and submit the transaction
    const signedTx = await tx.sign()
    const txHash = await tx.submit()

    return txHash
  } catch (error) {
    console.error("Error creating payment transaction:", error)
    throw error
  }
}

// Create a transaction with metadata
export const createTransactionWithMetadata = async (wallet: Wallet, metadata: Record<string, any>): Promise<string> => {
  try {
    // Create a transaction
    const tx = new Transaction({ initiator: wallet })

    // Add metadata to the transaction
    tx.setMetadata(0, metadata)

    // Sign and submit the transaction
    const signedTx = await tx.sign()
    const txHash = await tx.submit()

    return txHash
  } catch (error) {
    console.error("Error creating transaction with metadata:", error)
    throw error
  }
}

// Get transaction details
export const getTransactionDetails = async (txHash: string): Promise<any> => {
  try {
    // In a real implementation, you would fetch this from a Cardano blockchain explorer API
    // For demo purposes, we'll return mock data
    return {
      txHash,
      blockHeight: 12345678,
      timestamp: Date.now(),
      fee: 180000,
      inputs: [
        {
          address: "addr1qxy8epmr...",
          amount: 1000000,
        },
      ],
      outputs: [
        {
          address: "addr1qz9tzfh3...",
          amount: 820000,
        },
      ],
      metadata: {
        0: {
          key1: "value1",
          key2: "value2",
        },
      },
    }
  } catch (error) {
    console.error("Error getting transaction details:", error)
    throw error
  }
}

// Calculate transaction fee
export const calculateTransactionFee = async (
  wallet: Wallet,
  recipientAddress: string,
  amountLovelace: number,
): Promise<number> => {
  try {
    // Create a transaction
    const tx = new Transaction({ initiator: wallet })

    // Send lovelace to the recipient
    tx.sendLovelace(recipientAddress, amountLovelace.toString())

    // Calculate the fee
    const fee = await tx.calculateFee()

    return Number.parseInt(fee)
  } catch (error) {
    console.error("Error calculating transaction fee:", error)
    throw error
  }
}

