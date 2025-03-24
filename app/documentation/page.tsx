"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">TrustEcom Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A comprehensive guide to building and deploying TrustEcom for your hackathon
        </p>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="learning">Learning Path</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathon Tips</TabsTrigger>
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
                  <h3 className="text-lg font-medium">Target Users</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Buyers:</span> Looking for authentic products with verifiable
                      history.
                    </li>
                    <li>
                      <span className="font-medium">Sellers:</span> Wanting to prove product authenticity and reach more
                      buyers.
                    </li>
                    <li>
                      <span className="font-medium">Auctioneers:</span> Seeking secure platforms for auctioning rare
                      collectibles.
                    </li>
                    <li>
                      <span className="font-medium">Crypto Enthusiasts:</span> Interested in NFT-backed purchases and
                      blockchain applications.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Business Value</h3>
                  <p>
                    TrustEcom addresses key challenges in e-commerce, particularly in regions with high fraud rates. By
                    leveraging blockchain technology, it creates a trustless environment where buyers can verify product
                    authenticity without relying on centralized authorities. The platform also opens new opportunities
                    for sellers to reach global markets with verifiable authentic products.
                  </p>
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
│  Frontend       │     │  Backend        │     │  Blockchain     │
│  (Next.js)      │◄───►│  (Node.js)      │◄───►│  (Cardano)      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                        ┌─────────────────┐
                        │                 │
                        │  Database       │
                        │  (PostgreSQL)   │
                        │                 │
                        └─────────────────┘
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Key Components</h3>

                  <h4 className="font-medium mt-4">1. Frontend (Next.js)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>React-based UI with Next.js for server-side rendering and routing</li>
                    <li>Tailwind CSS for responsive styling</li>
                    <li>Wallet connection interface using CIP-30 compliant connectors</li>
                    <li>Client-side transaction building and signing</li>
                    <li>Product browsing, auction bidding, and marketplace interfaces</li>
                  </ul>

                  <h4 className="font-medium mt-4">2. Backend (Node.js)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>RESTful API for product management, user authentication, and transactions</li>
                    <li>Integration with Cardano blockchain for transaction verification</li>
                    <li>NFT minting and management services</li>
                    <li>Auction management and bid processing</li>
                    <li>Payment processing and currency conversion</li>
                  </ul>

                  <h4 className="font-medium mt-4">3. Blockchain Layer (Cardano)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Smart contracts for auctions and escrow services</li>
                    <li>NFT minting and token management</li>
                    <li>Transaction verification and processing</li>
                    <li>On-chain data storage for product verification</li>
                  </ul>

                  <h4 className="font-medium mt-4">4. Database (PostgreSQL/Supabase)</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Product catalog and metadata storage</li>
                    <li>User profiles and authentication data</li>
                    <li>Transaction history and order management</li>
                    <li>Review and rating system</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Data Flow</h3>
                  <p>The following diagram illustrates the data flow for a typical product purchase on TrustEcom:</p>
                  <div className="bg-muted p-4 rounded-md my-4">
                    <pre className="text-sm overflow-auto">
                      {`
1. User browses products → Frontend displays products from Backend
2. User selects product → Product details retrieved from Backend
3. User initiates purchase → Frontend connects to user's wallet
4. User confirms purchase → Transaction built and signed by wallet
5. Transaction submitted → Backend verifies transaction on blockchain
6. NFT ownership transferred → Backend updates product status
7. Purchase confirmed → Frontend displays confirmation to user
                      `}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Smart Contract Architecture</h3>
                  <p>TrustEcom utilizes several smart contracts on the Cardano blockchain:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">NFT Minting Contract:</span> Handles the creation of NFTs
                      representing products, embedding metadata about the product's characteristics and origin.
                    </li>
                    <li>
                      <span className="font-medium">Escrow Contract:</span> Manages secure transactions between buyers
                      and sellers, releasing funds only when delivery is confirmed.
                    </li>
                    <li>
                      <span className="font-medium">Auction Contract:</span> Handles bid management, winner
                      determination, and automatic payment processing for auction items.
                    </li>
                    <li>
                      <span className="font-medium">Verification Contract:</span> Provides on-chain verification of
                      product authenticity and ownership history.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
                <CardDescription>Essential skills and resources to build TrustEcom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Core Technologies to Learn</h3>

                  <div className="mt-4 space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">1. Cardano Blockchain Development</h4>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          Understanding Cardano's architecture, transaction model, and native tokens is essential for
                          building TrustEcom.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Key Concepts:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>Cardano's eUTxO model</li>
                            <li>Native tokens and NFTs on Cardano</li>
                            <li>Transaction building and signing</li>
                            <li>Metadata handling</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Learning Resources:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>
                              <Link
                                href="https://docs.cardano.org/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Cardano Documentation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://developers.cardano.org/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Cardano Developer Portal
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://www.youtube.com/c/CardanoFoundation"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Cardano Foundation YouTube
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">2. Smart Contract Development with Plutus</h4>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          Plutus is Cardano's smart contract platform, which uses Haskell as its programming language.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Key Concepts:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>Haskell programming language basics</li>
                            <li>Plutus smart contract structure</li>
                            <li>Validator scripts</li>
                            <li>On-chain and off-chain code</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Learning Resources:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>
                              <Link
                                href="https://plutus-pioneer-program.readthedocs.io/en/latest/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Plutus Pioneer Program
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="http://learnyouahaskell.com/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Learn You a Haskell for Great Good
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://playground.plutus.iohkdev.io/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Plutus Playground
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">3. Frontend Development</h4>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          Building a responsive, user-friendly interface for TrustEcom using modern web technologies.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Key Concepts:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>React.js fundamentals</li>
                            <li>Next.js for server-side rendering</li>
                            <li>Tailwind CSS for styling</li>
                            <li>Wallet integration (CIP-30)</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Learning Resources:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>
                              <Link href="https://react.dev/" target="_blank" className="text-primary hover:underline">
                                React Documentation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://nextjs.org/docs"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Next.js Documentation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://tailwindcss.com/docs"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Tailwind CSS Documentation
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">4. Backend Development</h4>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          Creating a robust backend to handle business logic, database operations, and blockchain
                          integration.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Key Concepts:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>Node.js and Express</li>
                            <li>RESTful API design</li>
                            <li>PostgreSQL/Supabase for database</li>
                            <li>Authentication and authorization</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Learning Resources:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>
                              <Link
                                href="https://nodejs.org/en/docs/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Node.js Documentation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://expressjs.com/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Express Documentation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://supabase.com/docs"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Supabase Documentation
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">5. Blockchain Integration</h4>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          Connecting your application to the Cardano blockchain and implementing wallet functionality.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Key Concepts:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>Cardano Serialization Library</li>
                            <li>Wallet connectors (CIP-30)</li>
                            <li>Transaction building and submission</li>
                            <li>Blockfrost API for blockchain data</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Learning Resources:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>
                              <Link
                                href="https://github.com/Emurgo/cardano-serialization-lib"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Cardano Serialization Library
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://cips.cardano.org/cips/cip30/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                CIP-30 Specification
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://docs.blockfrost.io/"
                                target="_blank"
                                className="text-primary hover:underline"
                              >
                                Blockfrost API Documentation
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Learning Strategy</h3>
                  <p>Follow this step-by-step approach to efficiently learn the necessary skills:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Start with frontend basics:</span> Learn React and Next.js to
                      understand the UI framework.
                    </li>
                    <li>
                      <span className="font-medium">Learn Cardano fundamentals:</span> Understand how the blockchain
                      works before diving into smart contracts.
                    </li>
                    <li>
                      <span className="font-medium">Build a simple wallet integration:</span> Connect to Cardano wallets
                      using CIP-30 standards.
                    </li>
                    <li>
                      <span className="font-medium">Develop backend services:</span> Create APIs for product management
                      and user authentication.
                    </li>
                    <li>
                      <span className="font-medium">Implement NFT functionality:</span> Learn how to mint and transfer
                      NFTs on Cardano.
                    </li>
                    <li>
                      <span className="font-medium">Develop smart contracts:</span> Create and test the auction and
                      escrow contracts.
                    </li>
                    <li>
                      <span className="font-medium">Integrate all components:</span> Connect frontend, backend, and
                      blockchain layers.
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guide</CardTitle>
                <CardDescription>Step-by-step instructions for building TrustEcom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Phase 1: Project Setup and Frontend Development</h3>

                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 1: Project Initialization</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          Set up the Next.js project with Tailwind CSS and shadcn/ui components:
                        </p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
# Create a new Next.js project
npx create-next-app@latest trustecom --typescript --tailwind --eslint

# Navigate to the project directory
cd trustecom

# Install shadcn/ui
npx shadcn@latest init

# Install required dependencies
npm install lucide-react @radix-ui/react-navigation-menu
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 2: Create Core UI Components</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Implement the main UI components as shown in the prototype:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Header with navigation</li>
                          <li>Footer</li>
                          <li>Product cards</li>
                          <li>Marketplace layout</li>
                          <li>Auction components</li>
                          <li>Wallet interface</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 3: Implement Wallet Context</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Create a wallet context to manage wallet connection and state:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
// Replace the mock implementation with actual Cardano wallet integration:
import { createContext, useContext, useState, useEffect } from "react"
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser"

const WalletContext = createContext(null)

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null)
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(0)
  
  const connectWallet = async () => {
    try {
      // Check if Nami wallet is available
      const walletAPI = await window.cardano?.nami?.enable();
      
      if (!walletAPI) {
        throw new Error("Nami wallet not found. Please install it.");
      }
      
      // Get wallet address
      const addressHex = await walletAPI.getChangeAddress();
      const address = CardanoSerializationLib.Address.from_bytes(
        Buffer.from(addressHex, 'hex')
      ).to_bech32();
      
      setWallet(walletAPI);
      setAddress(address);
      
      // Get wallet balance
      const balanceValue = await getWalletBalance(walletAPI);
      setBalance(balanceValue);
      
      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return false;
    }
  };
  
  // Other wallet functions...
  
  return (
    <WalletContext.Provider value={{ 
      wallet, 
      address, 
      balance, 
      connectWallet,
      // Other functions...
    }}>
      {children}
    </WalletContext.Provider>
  );
};
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Phase 2: Backend Development</h3>

                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 4: Set Up Backend API</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Create a Node.js/Express backend or use Next.js API routes:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        tokenData: true,
      },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 5: Database Integration</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Set up PostgreSQL with Prisma or Supabase for data storage:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  walletAddress String?   @unique
  products      Product[]
  bids          Bid[]
  reviews       Review[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  category    String
  sellerId    String
  seller      User     @relation(fields: [sellerId], references: [id])
  tokenId     String?  @unique
  tokenData   Token?
  isAuction   Boolean  @default(false)
  bids        Bid[]
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Token {
  id          String   @id @default(cuid())
  tokenId     String   @unique
  productId   String   @unique
  product     Product  @relation(fields: [productId], references: [id])
  metadata    Json
  txHash      String
  createdAt   DateTime @default(now())
}

model Bid {
  id        String   @id @default(cuid())
  amount    Float
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  bidderId  String
  bidder    User     @relation(fields: [bidderId], references: [id])
  txHash    String?
  createdAt DateTime @default(now())
}

model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())
}
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Phase 3: Blockchain Integration</h3>

                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 6: Cardano Wallet Integration</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Implement CIP-30 wallet connector for Nami, Eternl, etc.:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
// lib/cardano.ts
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

export async function getAvailableWallets() {
  const wallets = [];
  
  if (window.cardano?.nami) wallets.push('nami');
  if (window.cardano?.eternl) wallets.push('eternl');
  if (window.cardano?.flint) wallets.push('flint');
  
  return wallets;
}

export async function connectWallet(walletName) {
  try {
    const wallet = window.cardano?.[walletName];
    if (!wallet) throw new Error(\`\${walletName} wallet not found\`);
    
    const api = await wallet.enable();
    return api;
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
}

export async function getWalletBalance(walletAPI) {
  try {
    const balanceHex = await walletAPI.getBalance();
    const balance = CardanoSerializationLib.Value.from_bytes(
      Buffer.from(balanceHex, 'hex')
    );
    
    // Extract ADA amount in lovelace (1 ADA = 1,000,000 lovelace)
    const lovelace = balance.coin().to_str();
    const adaAmount = parseInt(lovelace) / 1000000;
    
    return adaAmount;
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    throw error;
  }
}
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 7: NFT Minting Implementation</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Create functionality to mint NFTs for products:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
// lib/nft.ts
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";
import { Buffer } from 'buffer';

export async function mintProductNFT(walletAPI, productData) {
  try {
    // Prepare metadata
    const metadata = {
      721: {
        [policyId]: {
          [assetName]: {
            name: productData.name,
            description: productData.description,
            image: productData.imageUrl,
            // Other product details
          }
        }
      }
    };
    
    // Get transaction parameters
    const latestBlock = await blockfrostAPI.blocksLatest();
    const parameters = await blockfrostAPI.epochsParameters(latestBlock.epoch);
    
    // Build the transaction
    // ... (transaction building code)
    
    // Sign and submit transaction
    const txHash = await walletAPI.signTx(tx, true);
    await blockfrostAPI.txSubmit(txHash);
    
    return {
      txHash,
      assetId: \`\${policyId}.\${assetName}\`,
    };
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
}
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 8: Smart Contract Development</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Develop Plutus smart contracts for auctions and escrow:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs overflow-auto">
                            {`
-- Auction.hs (Simplified example)
{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TemplateHaskell     #-}
{-# LANGUAGE TypeApplications    #-}
{-# LANGUAGE TypeFamilies        #-}

module Auction where

import           PlutusTx.Prelude
import qualified PlutusTx
import           Ledger               hiding (singleton)
import           Ledger.Constraints   as Constraints
import qualified Ledger.Typed.Scripts as Scripts
import           Ledger.Value         as Value

data AuctionDatum = AuctionDatum
    { auctionSeller   :: PubKeyHash
    , auctionDeadline :: POSIXTime
    , auctionMinBid   :: Integer
    , highestBid      :: Integer
    , highestBidder   :: PubKeyHash
    }

PlutusTx.unstableMakeIsData ''AuctionDatum

-- Auction validator logic
-- ...
                            `}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Phase 4: Integration and Testing</h3>

                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 9: Connect Frontend to Backend and Blockchain</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Integrate all components and implement data flow:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Connect product listings to backend API</li>
                          <li>Implement wallet connection in UI</li>
                          <li>Create purchase and auction flows</li>
                          <li>Implement NFT verification display</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Step 10: Testing on Testnet</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Test all functionality on Cardano testnet before mainnet deployment:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Test wallet connection and transactions</li>
                          <li>Test NFT minting and transfers</li>
                          <li>Test auction smart contracts</li>
                          <li>Test product listing and purchasing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hackathon" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Preparation</CardTitle>
                <CardDescription>Tips and strategies for presenting TrustEcom at your hackathon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Preparing Your Hackathon Submission</h3>

                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">1. Focus on a Minimum Viable Product (MVP)</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          For a hackathon, prioritize demonstrating core functionality over implementing every feature:
                        </p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>
                            <span className="font-medium">Must-have features:</span> Wallet connection, product listing,
                            NFT minting, and basic purchase flow
                          </li>
                          <li>
                            <span className="font-medium">Nice-to-have features:</span> Auctions, detailed verification
                            history, reviews
                          </li>
                          <li>
                            <span className="font-medium">Future features:</span> AI fraud detection, advanced search,
                            mobile app
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">2. Create a Compelling Demo</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Prepare a demonstration that showcases the unique value of TrustEcom:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Create a demo script that shows the complete user journey</li>
                          <li>Prepare sample products with interesting stories and verification histories</li>
                          <li>Show both buyer and seller perspectives</li>
                          <li>Demonstrate blockchain verification with visual explanations</li>
                          <li>Have fallback options in case of technical issues during the demo</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">3. Prepare Your Pitch</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          Craft a compelling pitch that highlights the problem, solution, and impact:
                        </p>
                        <ol className="list-decimal pl-6 text-sm space-y-1">
                          <li>
                            <span className="font-medium">Problem statement:</span> Highlight e-commerce fraud issues,
                            especially in Nigeria
                          </li>
                          <li>
                            <span className="font-medium">Solution overview:</span> Explain how blockchain verification
                            solves these problems
                          </li>
                          <li>
                            <span className="font-medium">Technical innovation:</span> Showcase the Cardano integration
                            and NFT tokenization
                          </li>
                          <li>
                            <span className="font-medium">Market opportunity:</span> Discuss the potential impact and
                            business model
                          </li>
                          <li>
                            <span className="font-medium">Demo:</span> Show the working prototype
                          </li>
                          <li>
                            <span className="font-medium">Roadmap:</span> Outline future development plans
                          </li>
                        </ol>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">4. Technical Documentation</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          Prepare comprehensive documentation for judges and technical evaluators:
                        </p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>GitHub repository with clear README</li>
                          <li>Architecture diagrams explaining system components</li>
                          <li>API documentation</li>
                          <li>Smart contract explanations</li>
                          <li>Setup instructions for running the project locally</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Hackathon Success Strategies</h3>

                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">1. Team Preparation</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Organize your team for maximum efficiency during the hackathon:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Assign clear roles based on technical strengths</li>
                          <li>Create a detailed timeline for the hackathon period</li>
                          <li>Set up communication channels and development environment</li>
                          <li>Practice your pitch and demo multiple times</li>
                          <li>Prepare answers for potential questions from judges</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">2. Technical Preparation</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Ensure your technical setup is ready for the hackathon:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Set up development environments for all team members</li>
                          <li>Create testnet wallets and fund them with test ADA</li>
                          <li>Prepare API keys for Blockfrost or other services</li>
                          <li>Set up a shared database instance</li>
                          <li>Create deployment pipelines for quick updates</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">3. Highlighting Blockchain Innovation</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Emphasize the blockchain aspects that make TrustEcom innovative:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Explain why Cardano is the right blockchain for this application</li>
                          <li>Demonstrate the security benefits of the eUTxO model</li>
                          <li>Show how NFTs provide verifiable authenticity</li>
                          <li>Explain how smart contracts enable trustless transactions</li>
                          <li>Highlight the environmental benefits of Cardano's Proof-of-Stake</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">4. Post-Hackathon Plans</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          Be prepared to discuss how you'll develop TrustEcom after the hackathon:
                        </p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                          <li>Short-term development roadmap</li>
                          <li>Business model and monetization strategy</li>
                          <li>Potential partnerships and integrations</li>
                          <li>Market entry strategy for Nigeria and beyond</li>
                          <li>Funding requirements and plans</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

