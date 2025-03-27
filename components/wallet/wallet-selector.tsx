"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useWallet } from "@/context/wallet-context"
import { ExternalLink, Wallet } from "lucide-react"
import { useEffect, useState } from "react"

const SUPPORTED_WALLETS = [
    {
        name: "Lace",
        description: "A modern Cardano wallet from IOG",
        icon: "https://lace.io/favicon.ico",
        installUrl: "https://lace.io/",
    },
    {
        name: "Eternl",
        description: "A feature-rich Cardano wallet",
        icon: "https://eternl.io/favicon.ico",
        installUrl: "https://eternl.io/",
    },
    {
        name: "Nami",
        description: "A browser extension wallet for Cardano",
        icon: "https://namiwallet.io/favicon.ico",
        installUrl: "https://namiwallet.io/",
    },
]

export function WalletSelector() {
    const { connectWallet, availableWallets, isConnected } = useWallet()
    const [isOpen, setIsOpen] = useState(false)

    console.log("🔍 WalletSelector: Current state:", {
        isConnected,
        availableWallets,
        isOpen
    })

    // Close dialog when wallet is connected
    useEffect(() => {
        if (isConnected) {
            console.log("✅ WalletSelector: Wallet connected, closing dialog");
            setIsOpen(false)
        }
    }, [isConnected])

    const handleWalletConnect = async (walletName: string) => {
        console.log("🚀 WalletSelector: Attempting to connect wallet:", walletName);
        try {
            const success = await connectWallet(walletName);
            console.log("✅ WalletSelector: Wallet connection result:", success);
        } catch (error) {
            console.error("❌ WalletSelector: Error connecting wallet:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            console.log("🔄 WalletSelector: Dialog state changing to:", open);
            setIsOpen(open);
        }}>
            <DialogTrigger asChild>
                <Button>
                    <Wallet className="mr-2 h-4 w-4" />
                    {isConnected ? "Wallet Connected" : "Connect Wallet"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connect Your Wallet</DialogTitle>
                    <DialogDescription>
                        Choose a Cardano wallet to connect to the marketplace. If you don't have one installed, you'll need to install it first.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {availableWallets.length > 0 ? (
                        // Show installed wallets
                        availableWallets.map((walletName) => (
                            <Button
                                key={walletName}
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleWalletConnect(walletName)}
                            >
                                <img
                                    src={SUPPORTED_WALLETS.find((w) => w.name.toLowerCase() === walletName.toLowerCase())?.icon || ""}
                                    alt={walletName}
                                    className="mr-2 h-6 w-6"
                                />
                                Connect {walletName}
                            </Button>
                        ))
                    ) : (
                        // Show installation instructions
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                No Cardano wallet detected. Please install one of the following wallets to continue:
                            </p>
                            {SUPPORTED_WALLETS.map((wallet) => (
                                <Button
                                    key={wallet.name}
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => {
                                        console.log("🔗 WalletSelector: Opening wallet installation URL:", wallet.installUrl);
                                        window.open(wallet.installUrl, "_blank");
                                    }}
                                >
                                    <img src={wallet.icon} alt={wallet.name} className="mr-2 h-6 w-6" />
                                    Install {wallet.name}
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 