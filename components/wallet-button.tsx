"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/context/wallet-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAvailableWallets } from "@/lib/cardano/wallet-connector"
import { Wallet, Network } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function WalletButton() {
  const { isConnected, address, isPreviewNetwork, isLoading, connectWallet, disconnectWallet } = useWallet()
  const availableWallets = getAvailableWallets()

  const handleConnect = async (walletName: string) => {
    try {
      await connectWallet(walletName)
    } catch (error) {
      console.error("Failed to connect:", error)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  if (isLoading) {
    return (
      <Button disabled>
        <Wallet className="mr-2 h-4 w-4" />
        Connecting...
      </Button>
    )
  }

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {address ? `${address.slice(0, 8)}...${address.slice(-8)}` : "Connected"}
            {!isPreviewNetwork && (
              <Network className="ml-2 h-4 w-4 text-yellow-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDisconnect}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableWallets.length === 0 ? (
          <DropdownMenuItem disabled>
            No wallets found. Please install a Cardano wallet.
          </DropdownMenuItem>
        ) : (
          availableWallets.map((wallet) => (
            <DropdownMenuItem
              key={wallet}
              onClick={() => handleConnect(wallet)}
            >
              {wallet}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

