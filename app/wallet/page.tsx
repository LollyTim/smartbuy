"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/context/wallet-context"
import { getWalletBalance, getTransactionHistory, subscribeToBalanceUpdates } from "@/lib/cardano/wallet-connector"
import { Separator } from "@/components/ui/separator"
import { Copy, ExternalLink, QrCode, RefreshCw, ArrowRight, Send, Download, History, Network } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import WalletButton from "@/components/wallet-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QRCodeSVG } from "qrcode.react"

export default function WalletPage() {
  const { isConnected, address, balance, sendTransaction, walletAPI } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transactions, setTransactions] = useState<Array<{
    hash: string;
    amount: number;
    type: 'sent' | 'received';
    timestamp: number;
  }>>([])
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [conversionRate, setConversionRate] = useState(20)
  const [nairaAmount, setNairaAmount] = useState("")
  const [adaAmount, setAdaAmount] = useState("")
  const [showQR, setShowQR] = useState(false)

  // Set up balance subscription
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (walletAPI && address) {
      subscribeToBalanceUpdates(walletAPI, (newBalance) => {
        // The balance will be updated through the wallet context
        console.log("Balance updated:", newBalance);
      }).then((cleanupFn) => {
        cleanup = cleanupFn;
      });
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [walletAPI, address]);

  // Fetch transaction history
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!walletAPI || !address) return;
      try {
        const history = await getTransactionHistory(walletAPI, address);
        setTransactions(history);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [walletAPI, address]);

  const handleRefreshBalance = async () => {
    if (!walletAPI) return;
    setIsRefreshing(true);
    try {
      const newBalance = await getWalletBalance(walletAPI);
      // The balance will be updated through the wallet context
      toast({
        title: "Balance Updated",
        description: "Your wallet balance has been refreshed.",
      });
    } catch (error) {
      console.error("Error refreshing balance:", error);
      toast({
        title: "Error",
        description: "Failed to refresh balance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSendTransaction = async () => {
    if (!amount || !recipient) return

    setIsLoading(true)
    try {
      const success = await sendTransaction(recipient, Number.parseFloat(amount))
      if (success) {
        setAmount("")
        setRecipient("")
      }
    } catch (error) {
      console.error("Transaction failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleNairaToAda = (value: string) => {
    setNairaAmount(value)
    const ada = value ? (Number.parseFloat(value) / conversionRate).toFixed(2) : ""
    setAdaAmount(ada)
  }

  const handleAdaToNaira = (value: string) => {
    setAdaAmount(value)
    const naira = value ? (Number.parseFloat(value) * conversionRate).toFixed(2) : ""
    setNairaAmount(naira)
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your Cardano wallet to access the TrustEcom platform features.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <WalletButton />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Wallet Overview</CardTitle>
            <CardDescription>Manage your Cardano assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label>Wallet Address</Label>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Network className="h-3 w-3" />
                  <span>Preview Network</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-muted p-2 rounded-md flex-1 font-mono text-xs overflow-hidden">
                  <span className="truncate">{address}</span>
                </div>
                <Button variant="outline" size="icon" onClick={handleCopyAddress}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy address</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <QrCode className="h-4 w-4" />
                      <span className="sr-only">Show QR code</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Receive ADA</DialogTitle>
                      <DialogDescription>
                        Scan this QR code to receive ADA to your wallet
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <QRCodeSVG value={address || ""} size={200} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-mono break-all">{address}</p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={handleCopyAddress}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Address
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Balance</Label>
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{balance.toFixed(6)} ₳</p>
                    <p className="text-sm text-muted-foreground">≈ {(balance * conversionRate).toFixed(2)} ₦</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRefreshBalance}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span className="sr-only">Refresh balance</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Transactions</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                  <History className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {transactions.map((tx, i) => (
                  <div key={tx.hash} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${tx.type === 'sent' ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        {tx.type === 'sent' ? <Send className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {tx.type === 'sent' ? "Sent" : "Received"} {tx.amount.toFixed(6)} ₳
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`https://preprod.cardanoscan.io/transaction/${tx.hash}`}
                      target="_blank"
                      className="text-xs flex items-center text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Link>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No transactions found
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send ADA</CardTitle>
            <CardDescription>Transfer ADA to another wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="addr1..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₳)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSendTransaction} disabled={isLoading || !amount || !recipient}>
              {isLoading ? "Processing..." : "Send"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Currency Converter</CardTitle>
            <CardDescription>Convert between Naira and ADA</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy ADA</TabsTrigger>
                <TabsTrigger value="sell">Sell ADA</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="naira-amount">Naira Amount (₦)</Label>
                  <Input
                    id="naira-amount"
                    type="number"
                    placeholder="0.00"
                    value={nairaAmount}
                    onChange={(e) => handleNairaToAda(e.target.value)}
                  />
                </div>

                <div className="flex justify-center py-2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ada-amount">ADA Amount (₳)</Label>
                  <Input
                    id="ada-amount"
                    type="number"
                    placeholder="0.00"
                    value={adaAmount}
                    onChange={(e) => handleAdaToNaira(e.target.value)}
                    readOnly
                  />
                </div>

                <Separator className="my-4" />

                <div className="text-sm text-muted-foreground">
                  <p>Exchange Rate: 1 ₳ = {conversionRate} ₦</p>
                  <p className="mt-1">Processing Fee: 1%</p>
                </div>

                <Button className="w-full mt-4">Buy ADA</Button>
              </TabsContent>
              <TabsContent value="sell" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="ada-sell-amount">ADA Amount (₳)</Label>
                  <Input
                    id="ada-sell-amount"
                    type="number"
                    placeholder="0.00"
                    value={adaAmount}
                    onChange={(e) => handleAdaToNaira(e.target.value)}
                  />
                </div>

                <div className="flex justify-center py-2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="naira-sell-amount">Naira Amount (₦)</Label>
                  <Input
                    id="naira-sell-amount"
                    type="number"
                    placeholder="0.00"
                    value={nairaAmount}
                    onChange={(e) => handleNairaToAda(e.target.value)}
                    readOnly
                  />
                </div>

                <Separator className="my-4" />

                <div className="text-sm text-muted-foreground">
                  <p>Exchange Rate: 1 ₳ = {conversionRate} ₦</p>
                  <p className="mt-1">Processing Fee: 1%</p>
                </div>

                <Button className="w-full mt-4">Sell ADA</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

