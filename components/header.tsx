"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, Search, ShoppingCart, Copy, User, Wallet, ShoppingBag, List, LogOut } from "lucide-react"
import { useWallet } from "@/context/wallet-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import WalletButton from "@/components/wallet-button"
import { toast } from "@/components/ui/use-toast"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected, disconnectWallet, balance, address } = useWallet()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className={cn("hover:text-foreground/80", pathname === "/" ? "text-foreground" : "text-foreground/60")}
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className={cn(
                  "hover:text-foreground/80",
                  pathname?.startsWith("/marketplace") ? "text-foreground" : "text-foreground/60",
                )}
              >
                Marketplace
              </Link>
              <Link
                href="/auctions"
                className={cn(
                  "hover:text-foreground/80",
                  pathname?.startsWith("/auctions") ? "text-foreground" : "text-foreground/60",
                )}
              >
                Auctions
              </Link>
              <Link
                href="/wallet"
                className={cn(
                  "hover:text-foreground/80",
                  pathname?.startsWith("/wallet") ? "text-foreground" : "text-foreground/60",
                )}
              >
                Wallet
              </Link>
              <Link
                href="/sell"
                className={cn(
                  "hover:text-foreground/80",
                  pathname?.startsWith("/sell") ? "text-foreground" : "text-foreground/60",
                )}
              >
                Sell
              </Link>
              <Link
                href="/documentation"
                className={cn(
                  "hover:text-foreground/80",
                  pathname?.startsWith("/documentation") ? "text-foreground" : "text-foreground/60",
                )}
              >
                Documentation
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">TrustEcom</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/marketplace" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Marketplace</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((category) => (
                    <li key={category.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={category.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/auctions" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Auctions</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sell" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sell</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/documentation" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center ml-auto">
          <div className="hidden md:flex relative mr-4">
            {isSearchOpen ? (
              <div className="absolute right-0 top-0 w-60">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                  onBlur={() => setIsSearchOpen(false)}
                  autoFocus
                />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="mr-2 relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">0</Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{address?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between space-x-4 p-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">{address}</p>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{address?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Balance</span>
                    <span className="text-sm font-bold">{balance.toFixed(2)} ₳</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Address</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-mono">{address?.slice(0, 8)}...{address?.slice(-4)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                        if (address) {
                          navigator.clipboard.writeText(address)
                          toast({
                            title: "Address Copied",
                            description: "Wallet address copied to clipboard",
                          })
                        }
                      }}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wallet" className="w-full">
                    <Wallet className="mr-2 h-4 w-4" />
                    Wallet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-purchases" className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Purchases
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-listings" className="w-full">
                    <List className="mr-2 h-4 w-4" />
                    My Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={disconnectWallet}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <WalletButton />
          )}
        </div>
      </div>
    </header>
  )
}

const categories = [
  {
    title: "Electronics",
    description: "Smartphones, laptops, and other tech gadgets with verified authenticity.",
    href: "/marketplace/electronics",
  },
  {
    title: "Collectibles",
    description: "Rare items and collectibles with blockchain-verified provenance.",
    href: "/marketplace/collectibles",
  },
  {
    title: "Fashion",
    description: "Authentic designer clothing and accessories.",
    href: "/marketplace/fashion",
  },
  {
    title: "Art",
    description: "Digital and physical art with NFT certificates of authenticity.",
    href: "/marketplace/art",
  },
]

