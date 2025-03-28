import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white-200 py-12 bg-green-700">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand column */}
          <div className="space-y-6 md:max-w-xs">
            <div>
              <h3 className="text-lg font-medium text-white">SmartBuy</h3>
              <p className="mt-3 text-sm text-gray-200 leading-relaxed">
                A transparent blockchain-based e-commerce marketplace powered by Cardano.
              </p>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-green-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-green-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-green-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Marketplace</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "All Products", href: "/marketplace" },
                  { label: "Live Auctions", href: "/auctions" },
                  { label: "Featured Items", href: "/marketplace/featured" },
                  { label: "New Arrivals", href: "/marketplace/new" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-200 hover:text-green-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Account</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "My Profile", href: "/profile" },
                  { label: "My Wallet", href: "/wallet" },
                  { label: "Purchase History", href: "/my-purchases" },
                  { label: "My Listings", href: "/my-listings" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-200 text-sm hover:text-green-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <h3 className="text-sm font-medium text-white">Stay Updated</h3>
              <p className="text-sm text-white">Subscribe for the latest products and blockchain news.</p>
              <form className="flex mt-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none border-white-200 focus:ring-green-500 focus:border-green-500 text-sm h-9"
                  required
                />
                <Button type="submit" size="sm" className="rounded-l-none bg-green-600 hover:bg-green-700 h-9">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white-100 text-center">
          <p className="text-xs text-white">© {new Date().getFullYear()} TrustEcom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

