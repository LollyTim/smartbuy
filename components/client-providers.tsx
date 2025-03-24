"use client"

import { WalletProvider } from "@/context/wallet-context"
import { Suspense, type ReactNode } from "react"

// Add error boundary and suspense to handle potential rendering issues
export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading wallet...</div>}>
      <WalletProvider>{children}</WalletProvider>
    </Suspense>
  )
}

