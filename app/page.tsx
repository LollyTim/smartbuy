"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, ChevronRight, Search, Shield, ShoppingBag, Star, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import FeaturesSection from "@/components/features"

export default function MarketplaceLanding() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    products: useRef(null),
    categories: useRef(null),
    faq: useRef(null),
    join: useRef(null),
  }

  // Handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  // Add smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className={cn(
          "py-12 md:py-20 transition-opacity duration-1000 ease-in-out",
          visibleSections.hero ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                🇳🇬 Authentic Nigerian Marketplace
              </Badge>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="text-green-600">Find it. Buy it.</span>
                <br />
                <span className="text-amber-500">Love it.</span>
              </h1>

              <p className="max-w-[600px] text-slate-600 text-lg md:text-xl">
                Discover authentic Nigerian products verified on blockchain. Shop with confidence on NaijaDrop.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="What are you looking for?"
                    className="pl-10 pr-4 py-6 rounded-full border-2 border-green-200 focus:border-green-500 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full py-6">
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Popular searches */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-slate-500">Popular:</span>
                {["Ankara", "Adire", "Art", "Jewelry", "Tech"].map((item) => (
                  <Link href={`/search?q=${item.toLowerCase()}`} key={item}>
                    <Badge
                      variant="outline"
                      className="bg-white hover:bg-green-50 text-green-600 border-green-200 rounded-full"
                    >
                      {item}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://img.freepik.com/free-photo/cinematic-style-mall_23-2151551292.jpg?t=st=1743116350~exp=1743119950~hmac=9dc921913d034d05ba581b5edc82dc5d7b7e7dc67c30c2084ecd82e63db7caac&w=1380"
                  alt="Nigerian Marketplace"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex flex-col justify-end p-6">
                  <Badge className="self-start mb-2 bg-amber-500 text-white">Trending Now</Badge>
                  <p className="text-white font-bold text-2xl">Authentic Nigerian Crafts</p>
                  <p className="text-white/80 mb-4">Direct from local artisans</p>
                  <Link href="/trending">
                    <Button className="bg-white text-green-600 hover:bg-white/90">
                      Explore Trending
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Categories Section with Images */}
      <section
        id="categories"
        ref={sectionRefs.categories}
        className={cn(
          "py-16 bg-white transition-all duration-1000 ease-in-out",
          visibleSections.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-green-600 text-white mb-2">Categories</Badge>
            <h2 className="text-3xl font-bold tracking-tighter">Explore Nigerian Excellence</h2>
            <p className="text-slate-600 mt-4 max-w-[700px] mx-auto">
              Browse our curated categories featuring authentic Nigerian products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Fashion", image: "/placeholder.svg?height=300&width=300&text=Fashion" },
              { name: "Accessories", image: "/placeholder.svg?height=300&width=300&text=Accessories" },
              { name: "Food", image: "/placeholder.svg?height=300&width=300&text=Food" },
              { name: "Art", image: "/placeholder.svg?height=300&width=300&text=Art" },
              { name: "Technology", image: "/placeholder.svg?height=300&width=300&text=Technology" },
              { name: "Home", image: "/placeholder.svg?height=300&width=300&text=Home" },
              { name: "Beauty", image: "/placeholder.svg?height=300&width=300&text=Beauty" },
              { name: "Music", image: "/placeholder.svg?height=300&width=300&text=Music" },
            ].map((category) => (
              <Link href={`/category/${category.name.toLowerCase()}`} key={category.name}>
                <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Products Section */}
      <section
        id="products"
        ref={sectionRefs.products}
        className={cn(
          "py-16 bg-white transition-all duration-1000 ease-in-out",
          visibleSections.products ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="bg-amber-500 text-white mb-2">Featured Products</Badge>
              <h2 className="text-3xl font-bold tracking-tighter">Trending Items</h2>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="text-green-600 hover:text-green-700">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Horizontal scrolling product cards */}
          <div className="relative">
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide snap-x snap-mandatory">
              {[
                {
                  name: "Handwoven Market Basket",
                  price: "₦12,500",
                  originalPrice: "₦15,000",
                  discount: "17%",
                  image: "/placeholder.svg?height=300&width=300&text=Basket",
                  rating: 5,
                  reviews: 128,
                },
                {
                  name: "Ankara Fabric Tote Bag",
                  price: "₦8,900",
                  originalPrice: "₦10,500",
                  discount: "15%",
                  image: "/placeholder.svg?height=300&width=300&text=Tote+Bag",
                  rating: 4.5,
                  reviews: 86,
                },
                {
                  name: "Adire Throw Pillow Cover",
                  price: "₦5,200",
                  originalPrice: "₦6,000",
                  discount: "13%",
                  image: "/placeholder.svg?height=300&width=300&text=Pillow",
                  rating: 4.8,
                  reviews: 64,
                },
                {
                  name: "Handcrafted Wooden Bowl",
                  price: "₦9,800",
                  originalPrice: "₦12,000",
                  discount: "18%",
                  image: "/placeholder.svg?height=300&width=300&text=Bowl",
                  rating: 4.7,
                  reviews: 42,
                },
                {
                  name: "Nigerian Spice Collection",
                  price: "₦7,500",
                  originalPrice: "₦8,500",
                  discount: "12%",
                  image: "/placeholder.svg?height=300&width=300&text=Spices",
                  rating: 4.9,
                  reviews: 103,
                },
                {
                  name: "Beaded Necklace Set",
                  price: "₦15,200",
                  originalPrice: "₦18,000",
                  discount: "16%",
                  image: "/placeholder.svg?height=300&width=300&text=Necklace",
                  rating: 4.6,
                  reviews: 57,
                },
              ].map((product, index) => (
                <div key={index} className="min-w-[240px] md:min-w-[280px] snap-start">
                  <Card className="h-full border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
                    <div className="relative aspect-square">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600 text-white">New</Badge>
                      {product.discount && (
                        <Badge className="absolute top-3 right-3 bg-amber-500 text-white">-{product.discount}</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3",
                                i < Math.floor(product.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : i < product.rating
                                    ? "fill-amber-400/50 text-amber-400/50"
                                    : "fill-slate-200 text-slate-200",
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-green-600">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-500 line-through ml-1">{product.originalPrice}</span>
                          )}
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600 rounded-full">
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Optional scroll indicators */}
            <div className="hidden md:flex items-center justify-center mt-6 space-x-2">
              <div className="h-1.5 w-8 rounded-full bg-green-600"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="join"
        ref={sectionRefs.join}
        className={cn(
          "py-16 bg-white transition-all duration-1000 ease-in-out",
          visibleSections.join ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="container px-4 md:px-6">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Join The NaijaDrop Community</h2>
                  <p className="mb-6 opacity-90">
                    Be part of the revolution that's changing how Nigerians shop online. Authentic products, secure
                    transactions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">
                      Sign Up Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white/10 rounded-full"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-amber-500/30"></div>
                    <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-green-300/30"></div>
                    <div className="text-9xl">🚀</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        ref={sectionRefs.faq}
        className={cn(
          "py-16 bg-white transition-all duration-1000 ease-in-out",
          visibleSections.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500 text-white mb-2">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-slate-600 mt-4 max-w-[700px] mx-auto">
              Everything you need to know about NaijaDrop and our marketplace
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-medium py-4">
                  How does NaijaDrop verify product authenticity?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  We use blockchain technology to create a unique digital certificate (NFT) for each product. This
                  certificate contains information about the product's origin, materials, and creator. You can verify
                  this information by scanning the QR code on your product or checking the blockchain record in your
                  account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-medium py-4">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  We accept multiple payment methods including credit/debit cards, bank transfers, cryptocurrency
                  (Bitcoin, Ethereum), and mobile money services like Paystack and Flutterwave. All payment information
                  is securely processed and never stored on our servers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-medium py-4">How long does shipping take?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  Shipping times vary depending on your location. Domestic shipping within Nigeria typically takes 2-5
                  business days. International shipping can take 7-14 business days depending on the destination
                  country. Express shipping options are available at checkout for faster delivery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-medium py-4">What is your return policy?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  We offer a 14-day return policy for most items. Products must be in their original condition with tags
                  attached. Custom-made items and perishable goods cannot be returned unless they arrive damaged or
                  defective. Please contact our customer service team to initiate a return.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-medium py-4">
                  How can I become a seller on NaijaDrop?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  To become a seller, click on the "Become a Seller" button and complete the application form. You'll
                  need to provide information about your business, the types of products you sell, and go through our
                  verification process. Once approved, you can start listing your authentic Nigerian products on our
                  marketplace.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Join Section */}

    </>
  )
}

