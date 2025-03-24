import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, Filter, Search, ShoppingCart } from "lucide-react"

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Browse verified products on the blockchain</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full md:w-[300px] pl-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                All Categories
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Electronics
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Collectibles
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Fashion
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Art
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Min" />
              <Input type="number" placeholder="Max" />
            </div>
            <Button className="w-full mt-2" size="sm">
              Apply
            </Button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Verification Status</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                All Items
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Verified Only
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Showing 12 of 48 products</p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCard key={i} id={i + 1} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="mx-2">
                  Previous
                </Button>
                <Button variant="outline" className="mx-2">
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="new">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCard key={i} id={i + 10} isNew />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCard key={i} id={i + 20} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ id, isNew = false }: { id: number; isNew?: boolean }) {
  const categories = ["Electronics", "Collectibles", "Fashion", "Art"]
  const category = categories[id % categories.length]
  const price = 50 + ((id * 25) % 500)
  const tokenId = `asset1q9v8p8xz6z4xz6z4xz6z4xz6z4xz6z4xz6z${id}`

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={`/placeholder.svg?height=300&width=300&text=Product+${id}`}
          alt={`Product ${id}`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Verified NFT
          </Badge>
        </div>
        {isNew && (
          <div className="absolute top-2 left-2">
            <Badge variant="default">New</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium truncate">Product Name {id}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="font-bold">{price} ₳</p>
            <Link
              href={`https://cardanoscan.io/token/${tokenId}`}
              target="_blank"
              className="text-xs flex items-center text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View on Chain
            </Link>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="default" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Link href={`/marketplace/product/${id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

