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
import { Menu, Search, ShoppingCart, Copy, User, Wallet, ShoppingBag, List, LogOut, Heart, Bell } from "lucide-react"
import { useWallet } from "@/context/wallet-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      {/* Top bar with promotions/announcements */}
      <div className="bg-primary text-primary-foreground py-1.5 text-center text-sm font-medium">
        <p>Free shipping on orders over $50 | Use code WELCOME10 for 10% off your first order</p>
      </div>

      <div className="container flex flex-col py-3">
        {/* Main header row */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl">SmartBuy</span>
                  </Link>
                </div>
                <nav className="grid gap-4 py-4 text-base font-medium">
                  <Link
                    href="/"
                    className={cn(
                      "hover:text-foreground/80 px-2 py-1.5 rounded-md",
                      pathname === "/" ? "bg-accent text-foreground" : "text-foreground/70",
                    )}
                  >
                    Home
                  </Link>
                  <Link
                    href="/marketplace"
                    className={cn(
                      "hover:text-foreground/80 px-2 py-1.5 rounded-md",
                      pathname?.startsWith("/marketplace") ? "bg-accent text-foreground" : "text-foreground/70",
                    )}
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/auctions"
                    className={cn(
                      "hover:text-foreground/80 px-2 py-1.5 rounded-md",
                      pathname?.startsWith("/auctions") ? "bg-accent text-foreground" : "text-foreground/70",
                    )}
                  >
                    Auctions
                  </Link>
                  <Link
                    href="/wallet"
                    className={cn(
                      "hover:text-foreground/80 px-2 py-1.5 rounded-md",
                      pathname?.startsWith("/wallet") ? "bg-accent text-foreground" : "text-foreground/70",
                    )}
                  >
                    Wallet
                  </Link>
                  <Link
                    href="/sell"
                    className={cn(
                      "hover:text-foreground/80 px-2 py-1.5 rounded-md",
                      pathname?.startsWith("/sell") ? "bg-accent text-foreground" : "text-foreground/70",
                    )}
                  >
                    Sell
                  </Link>
                  <Link
                    href="/documentation"
                    className={cn(
                      "hover:text-foreground/80 px-2 py-1.5 rounded-md",
                      pathname?.startsWith("/documentation") ? "bg-accent text-foreground" : "text-foreground/70",
                    )}
                  >
                    Documentation
                  </Link>
                  <div className="pt-2 mt-2 border-t">
                    <Link href="/become-seller">
                      <Button className="w-full">Become a Seller</Button>
                    </Link>
                  </div>
                </nav>
                <div className="mt-auto border-t py-4">
                  {isConnected ? (
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{address?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">My Account</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {address?.slice(0, 8)}...{address?.slice(-4)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <WalletButton className="w-full" />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-green-600">SmartBuy</span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for products, brands, and categories..."
                className="w-full pl-10 pr-4 py-2 h-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search button - mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden sm:flex relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                  2
                </Badge>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* User account */}
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
                        <span className="text-xs font-mono">
                          {address?.slice(0, 8)}...{address?.slice(-4)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            if (address) {
                              navigator.clipboard.writeText(address)
                              toast({
                                title: "Address Copied",
                                description: "Wallet address copied to clipboard",
                              })
                            }
                          }}
                        >
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

            {/* Become a seller button - desktop */}
            <Link href="/become-seller" className="hidden md:block ml-2">
              <Button variant="outline" className="font-medium">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search - conditional */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Navigation - desktop */}
        <div className="hidden md:flex mt-4">
          <NavigationMenu>
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

