"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">TrustEcom Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A comprehensive guide to building and deploying TrustEcom for your blockchain e-commerce platform
        </p>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="wallet">Wallet Integration</TabsTrigger>
            <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="nft">NFT Implementation</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Understanding the core concepts and features of TrustEcom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What is TrustEcom?</h3>
                  <p>
                    TrustEcom is a blockchain-based e-commerce marketplace built on the Cardano blockchain. It enables
                    transparent, secure transactions with NFT-backed product authenticity verification, auction
                    capabilities, and an integrated wallet system.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Core Features</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">NFT Tokenization:</span> Products are minted as NFTs on the Cardano
                      blockchain, providing immutable proof of authenticity and ownership history.
                    </li>
                    <li>
                      <span className="font-medium">Transparent Verification:</span> All transactions are recorded
                      on-chain, allowing buyers to verify product history and authenticity.
                    </li>
                    <li>
                      <span className="font-medium">Auction System:</span> Smart contract-powered auctions for rare and
                      collectible items.
                    </li>
                    <li>
                      <span className="font-medium">Integrated Wallet:</span> Built-in Cardano wallet with Naira
                      conversion capabilities.
                    </li>
                    <li>
                      <span className="font-medium">Verified Reviews:</span> Only verified buyers can leave product
                      reviews, reducing fraud.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Technology Stack</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Frontend:</span> Next.js 14 with App Router, React 18, Tailwind CSS,
                      shadcn/ui
                    </li>
                    <li>
                      <span className="font-medium">Blockchain Integration:</span> Mesh.js SDK for Cardano integration
                    </li>
                    <li>
                      <span className="font-medium">Smart Contracts:</span> Cardano smart contracts for escrow,
                      auctions, and NFT minting
                    </li>
                    <li>
                      <span className="font-medium">Storage:</span> IPFS for decentralized storage of product images and
                      metadata
                    </li>
                    <li>
                      <span className="font-medium">Wallet:</span> CIP-30 compliant wallet integration (Nami, Eternl,
                      Flint, etc.)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Architecture</CardTitle>
                <CardDescription>Understanding the system design and component interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">System Architecture</h3>
                  <p>TrustEcom follows a modern full-stack architecture with blockchain integration:</p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Frontend       │     │  Blockchain     │     │  Decentralized  │
│  (Next.js)      │◄───►│  (Cardano)      │◄───►│  Storage (IPFS) │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│  Wallet         │     │  Smart          │
│  Integration    │     │  Contracts      │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Key Components</h3>

                  <h4 className="font-medium mt-4">1. Frontend (Next.js)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>React-based UI with Next.js App Router for server-side rendering and routing</li>
                    <li>Tailwind CSS for responsive styling with shadcn/ui components</li>
                    <li>Client-side wallet integration using Mesh.js</li>
                    <li>Product browsing, auction bidding, and marketplace interfaces</li>
                  </ul>

                  <h4 className="font-medium mt-4">2. Blockchain Integration (Mesh.js)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Wallet connection and management</li>
                    <li>Transaction building and signing</li>
                    <li>NFT minting and management</li>
                    <li>Smart contract interaction</li>
                  </ul>

                  <h4 className="font-medium mt-4">3. Smart Contracts</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Escrow contracts for secure transactions</li>
                    <li>Auction contracts for bidding and winner determination</li>
                    <li>NFT minting policies for product tokenization</li>
                  </ul>

                  <h4 className="font-medium mt-4">4. Decentralized Storage (IPFS)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Product image storage</li>
                    <li>NFT metadata storage</li>
                    <li>Permanent, decentralized access to product information</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Data Flow</h3>
                  <p>The following diagram illustrates the data flow for a typical product purchase on TrustEcom:</p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
1. User connects wallet → Mesh.js handles wallet connection
2. User lists product → Product image uploaded to IPFS
3. Product tokenized as NFT → NFT minted on Cardano blockchain
4. Buyer browses products → Product details retrieved from blockchain
5. Buyer purchases product → Escrow contract created
6. Transaction confirmed → NFT ownership transferred
7. Purchase completed → Buyer receives NFT certificate
                      `}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Integration</CardTitle>
                <CardDescription>How TrustEcom integrates with Cardano wallets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Mesh.js Integration</h3>
                  <p>
                    TrustEcom uses the Mesh.js SDK to integrate with Cardano wallets. Mesh.js provides a unified API for
                    interacting with different Cardano wallets that follow the CIP-30 standard.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// components/client-providers.tsx
"use client"

import { WalletProvider } from "@/context/wallet-context"
import { MeshProvider } from "@meshsdk/react"
import { Suspense, type ReactNode } from "react"

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <MeshProvider>
      <Suspense fallback={<div>Loading wallet...</div>}>
        <WalletProvider>{children}</WalletProvider>
      </Suspense>
    </MeshProvider>
  )
}
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Wallet Context</h3>
                  <p>
                    The WalletContext provides a centralized way to manage wallet state and functions throughout the
                    application. It handles wallet connection, disconnection, balance retrieval, and transaction
                    operations.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example usage of wallet context
import { useWallet } from "@/context/wallet-context"

export default function MyComponent() {
  const { isConnected, address, balance, connectWallet } = useWallet()
  
  return (
    <div>
      {isConnected ? (
        <p>Connected: {address} ({balance} ₳)</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  )
}
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Supported Wallets</h3>
                  <p>TrustEcom supports any Cardano wallet that implements the CIP-30 standard, including:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nami</li>
                    <li>Eternl</li>
                    <li>Flint</li>
                    <li>Yoroi</li>
                    <li>GeroWallet</li>
                    <li>Typhon</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Wallet Functions</h3>
                  <p>The wallet integration provides the following functions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <span className="font-medium">connectWallet:</span> Connect to a Cardano wallet
                    </li>
                    <li>
                      <span className="font-medium">disconnectWallet:</span> Disconnect from the current wallet
                    </li>
                    <li>
                      <span className="font-medium">sendTransaction:</span> Send ADA to another address
                    </li>
                    <li>
                      <span className="font-medium">mintNFT:</span> Mint an NFT for a product
                    </li>
                    <li>
                      <span className="font-medium">createAuction:</span> Create an auction for a product
                    </li>
                    <li>
                      <span className="font-medium">placeBid:</span> Place a bid on an auction
                    </li>
                    <li>
                      <span className="font-medium">purchaseProduct:</span> Purchase a product using an escrow contract
                    </li>
                    <li>
                      <span className="font-medium">getTransactionHistory:</span> Get transaction history for the
                      connected wallet
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="smart-contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Contracts</CardTitle>
                <CardDescription>How TrustEcom uses Cardano smart contracts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Escrow Contracts</h3>
                  <p>
                    Escrow contracts are used to facilitate secure transactions between buyers and sellers. The contract
                    holds the payment until the product is delivered, then releases the payment to the seller.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example of creating an escrow contract
import { createEscrowContract } from "@/lib/cardano/smart-contracts"

const txHash = await createEscrowContract(wallet, {
  productId: "product123",
  price: 100000000, // 100 ADA in lovelace
  buyer: buyerAddress,
  seller: sellerAddress,
})
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Auction Contracts</h3>
                  <p>
                    Auction contracts manage the bidding process for products. They ensure that bids are valid, track
                    the highest bidder, and automatically transfer the product to the winner when the auction ends.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example of creating an auction contract
import { createAuctionContract } from "@/lib/cardano/smart-contracts"

const auctionId = await createAuctionContract(wallet, {
  productId: "product123",
  startingPrice: 50000000, // 50 ADA in lovelace
  duration: 604800, // 7 days in seconds
  seller: sellerAddress,
  endTime: Math.floor(Date.now() / 1000) + 604800,
})
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">NFT Minting Policies</h3>
                  <p>
                    NFT minting policies control the creation of NFTs for products. They ensure that each NFT is unique
                    and can only be minted by the authorized seller.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example of generating a policy ID for NFT minting
import { generatePolicyId } from "@/lib/cardano/nft-helpers"

const policyId = await generatePolicyId(wallet)
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Transaction Building</h3>
                  <p>
                    TrustEcom uses Mesh.js to build and sign transactions. This includes simple payments, NFT minting,
                    and interactions with smart contracts.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example of building a transaction
import { Transaction } from "@meshsdk/core"

const tx = new Transaction({ initiator: wallet })
tx.sendLovelace(recipientAddress, "100000000") // 100 ADA
tx.setMetadata(0, { type: "payment", description: "Payment for Product" })
const signedTx = await tx.sign()
const txHash = await tx.submit()
                      `}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nft" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NFT Implementation</CardTitle>
                <CardDescription>How TrustEcom uses NFTs for product authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">NFT Minting Process</h3>
                  <p>
                    When a seller lists a product, TrustEcom mints an NFT to represent the product. This NFT contains
                    metadata about the product, including its name, description, image, and other attributes.
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Seller uploads product image</li>
                    <li>Image is stored on IPFS</li>
                    <li>Product metadata is created with the IPFS image URL</li>
                    <li>Metadata is stored on IPFS</li>
                    <li>NFT is minted on the Cardano blockchain with the metadata URL</li>
                    <li>NFT is assigned to the seller's wallet</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">NFT Metadata</h3>
                  <p>
                    The NFT metadata follows the CIP-25 standard for Cardano NFTs. It includes the following
                    information:
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
{
  "721": {
    "policy_id": {
      "asset_name": {
        "name": "Product Name",
        "description": "Product Description",
        "image": "ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        "mediaType": "image/png",
        "attributes": [
          { "trait_type": "Category", "value": "Electronics" },
          { "trait_type": "Price", "value": 100 },
          { "trait_type": "Seller", "value": "addr1qxy8epmr..." },
          { "trait_type": "Created", "value": "2023-05-01T12:00:00Z" }
        ]
      }
    }
  }
}
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">NFT Transfer</h3>
                  <p>
                    When a product is purchased, the NFT is transferred from the seller to the buyer. This transfer is
                    recorded on the blockchain, providing a transparent record of ownership.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example of transferring an NFT
import { Transaction } from "@meshsdk/core"

const tx = new Transaction({ initiator: wallet })
tx.sendAssets(buyerAddress, [
  {
    unit: assetId,
    quantity: "1",
  },
])
const signedTx = await tx.sign()
const txHash = await tx.submit()
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">NFT Verification</h3>
                  <p>
                    Buyers can verify the authenticity of a product by checking its NFT on the blockchain. This includes
                    viewing the product's metadata, ownership history, and transaction records.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
// Example of verifying NFT ownership
import { verifyNFTOwnership } from "@/lib/cardano/nft-helpers"

const isOwner = await verifyNFTOwnership(wallet, assetId)
                      `}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Setup Guide</CardTitle>
                <CardDescription>How to set up and deploy TrustEcom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Prerequisites</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Node.js 18 or later</li>
                    <li>npm or yarn</li>
                    <li>Cardano wallet extension (Nami, Eternl, Flint, etc.)</li>
                    <li>Infura account for IPFS storage</li>
                    <li>Blockfrost API key for Cardano blockchain interaction</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Installation</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Clone the repository:
                      <div className="bg-muted p-2 rounded-md my-2">
                        <code>git clone https://github.com/yourusername/trustecom.git</code>
                      </div>
                    </li>
                    <li>
                      Install dependencies:
                      <div className="bg-muted p-2 rounded-md my-2">
                        <code>cd trustecom && npm install</code>
                      </div>
                    </li>
                    <li>
                      Create a <code>.env.local</code> file with the following variables:
                      <div className="bg-muted p-2 rounded-md my-2">
                        <pre>
                          {`NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_INFURA_PROJECT_SECRET=your_infura_project_secret
NEXT_PUBLIC_BLOCKFROST_API_KEY=your_blockfrost_api_key
NEXT_PUBLIC_BLOCKFROST_URL=https://cardano-testnet.blockfrost.io/api/v0
INFURA_PROJECT_ID=your_infura_project_id
INFURA_PROJECT_SECRET=your_infura_project_secret`}
                        </pre>
                      </div>
                    </li>
                    <li>
                      Start the development server:
                      <div className="bg-muted p-2 rounded-md my-2">
                        <code>npm run dev</code>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Deployment</h3>
                  <p>
                    TrustEcom can be deployed to Vercel or any other hosting platform that supports Next.js
                    applications.
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Build the application:
                      <div className="bg-muted p-2 rounded-md my-2">
                        <code>npm run build</code>
                      </div>
                    </li>
                    <li>
                      Deploy to Vercel:
                      <div className="bg-muted p-2 rounded-md my-2">
                        <code>vercel --prod</code>
                      </div>
                    </li>
                    <li>Set up environment variables in the Vercel dashboard.</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Testing</h3>
                  <p>
                    It's recommended to test TrustEcom on the Cardano testnet before deploying to mainnet. This allows
                    you to verify that all functionality works correctly without using real ADA.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use a testnet wallet (Nami, Eternl, etc.)</li>
                    <li>Get testnet ADA from the Cardano testnet faucet</li>
                    <li>Test all functionality: wallet connection, NFT minting, auctions, purchases</li>
                    <li>Verify that transactions are recorded correctly on the testnet blockchain</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Customization</h3>
                  <p>TrustEcom can be customized to fit your specific needs. Here are some common customizations:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Change the color scheme in <code>tailwind.config.ts</code>
                    </li>
                    <li>
                      Modify the product categories in <code>components/header.tsx</code>
                    </li>
                    <li>
                      Add additional fields to product metadata in <code>lib/ipfs/ipfs-client.ts</code>
                    </li>
                    <li>
                      Implement additional smart contract functionality in <code>lib/cardano/smart-contracts.ts</code>
                    </li>
                    <li>Add support for additional payment methods</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Troubleshooting</h3>
                  <p>If you encounter issues with TrustEcom, here are some common solutions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <span className="font-medium">Wallet connection issues:</span> Make sure you have a compatible
                      wallet extension installed and that it's configured for the correct network (testnet or mainnet).
                    </li>
                    <li>
                      <span className="font-medium">IPFS upload failures:</span> Verify your Infura credentials and
                      check that you have sufficient storage quota.
                    </li>
                    <li>
                      <span className="font-medium">Transaction errors:</span> Ensure you have sufficient ADA to cover
                      the transaction fee and that your wallet is properly connected.
                    </li>
                    <li>
                      <span className="font-medium">NFT minting issues:</span> Check that your Blockfrost API key is
                      valid and that you're using the correct network (testnet or mainnet).
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Resources</h3>
                  <p>Here are some helpful resources for working with TrustEcom and its underlying technologies:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <Link href="https://meshjs.dev/" target="_blank" className="text-primary hover:underline">
                        Mesh.js Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="https://docs.cardano.org/" target="_blank" className="text-primary hover:underline">
                        Cardano Documentation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cips.cardano.org/cips/cip25/"
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        CIP-25: NFT Metadata Standard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cips.cardano.org/cips/cip30/"
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        CIP-30: Wallet Web Bridge
                      </Link>
                    </li>
                    <li>
                      <Link href="https://docs.ipfs.tech/" target="_blank" className="text-primary hover:underline">
                        IPFS Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="https://nextjs.org/docs" target="_blank" className="text-primary hover:underline">
                        Next.js Documentation
                      </Link>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

