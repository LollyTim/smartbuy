"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Shield, Wallet, ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function FeaturesSection() {
    const [activeFeature, setActiveFeature] = useState(0)
    const featuresRef = useRef(null)

    const features = [
        {
            id: 0,
            icon: <Shield className="h-6 w-6" />,
            title: "Verified Authentic",
            description: "Every item gets an NFT verification tag. If it's on our platform, it's certified authentic.",
            color: "from-green-500 to-green-600",
            lightColor: "bg-green-50",
            textColor: "text-green-600",
            image: "/placeholder.svg?height=400&width=600&text=Verification",
        },
        {
            id: 1,
            icon: <CheckCircle className="h-6 w-6" />,
            title: "Blockchain Secured",
            description: "All transactions are recorded on the blockchain, providing transparent and immutable records.",
            color: "from-amber-500 to-amber-600",
            lightColor: "bg-amber-50",
            textColor: "text-amber-600",
            image: "/placeholder.svg?height=400&width=600&text=Blockchain",
        },
        {
            id: 2,
            icon: <Wallet className="h-6 w-6" />,
            title: "Flexible Payments",
            description: "Pay with Naira, crypto, or other payment methods. We make transactions seamless.",
            color: "from-emerald-500 to-emerald-600",
            lightColor: "bg-emerald-50",
            textColor: "text-emerald-600",
            image: "/placeholder.svg?height=400&width=600&text=Payments",
        },
    ]

    return (
        <section className="py-20 overflow-hidden bg-white">
            <div className="container px-4 md:px-6">
                {/* Heading with asymmetric design */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                    <div className="max-w-md">
                        <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-500 to-green-600 text-white mb-4">
                            Why Choose NaijaDrop
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            The future of{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-amber-500">
                                Nigerian e-commerce
                            </span>{" "}
                            is here
                        </h2>
                    </div>
                    <p className="text-slate-600 mt-4 md:mt-0 md:max-w-xs">
                        We're revolutionizing online shopping with blockchain verification and secure transactions.
                    </p>
                </div>

                {/* Interactive features display */}
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    {/* Feature selector - left side */}
                    <div className="md:col-span-5 space-y-6" ref={featuresRef}>
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={cn(
                                    "relative cursor-pointer group transition-all duration-300 ease-in-out",
                                    activeFeature === index ? "scale-105" : "opacity-70 hover:opacity-100",
                                )}
                                onClick={() => setActiveFeature(index)}
                            >
                                <div
                                    className={cn(
                                        "absolute left-0 top-0 w-1 h-full rounded-full transition-all duration-300",
                                        activeFeature === index
                                            ? `bg-gradient-to-b ${feature.color}`
                                            : "bg-slate-200 group-hover:bg-slate-300",
                                    )}
                                />

                                <div className="pl-6 py-2">
                                    <div className="flex items-center mb-2">
                                        <div
                                            className={cn(
                                                "p-2 rounded-lg mr-3 transition-colors",
                                                activeFeature === index ? feature.lightColor : "bg-slate-100",
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "transition-colors",
                                                    activeFeature === index ? feature.textColor : "text-slate-400",
                                                )}
                                            >
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <h3
                                            className={cn(
                                                "font-semibold text-lg transition-colors",
                                                activeFeature === index ? "text-slate-900" : "text-slate-600",
                                            )}
                                        >
                                            {feature.title}
                                        </h3>
                                        {activeFeature === index && <ChevronRight className="ml-2 h-4 w-4 text-slate-400" />}
                                    </div>

                                    <div
                                        className={cn(
                                            "pl-11 pr-4 transition-all duration-300",
                                            activeFeature === index ? "max-h-24 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
                                        )}
                                    >
                                        <p className="text-slate-600 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pl-6 pt-4">
                            <Button variant="outline" className="mt-2 group">
                                Learn more
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>

                    {/* Visual display - right side */}
                    <div className="md:col-span-7 relative">
                        <div className="absolute -top-10 -bottom-10 -right-10 -left-10 bg-slate-50 rounded-[40px] -z-10 transform rotate-3" />

                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{
                                        opacity: activeFeature === index ? 1 : 0,
                                        x: activeFeature === index ? 0 : 20,
                                        zIndex: activeFeature === index ? 10 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 z-10" />
                                    <img
                                        src={feature.image || "/placeholder.svg"}
                                        alt={feature.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <div
                                            className={cn(
                                                "inline-block rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r text-white mb-2",
                                                feature.color,
                                            )}
                                        >
                                            Feature {index + 1}
                                        </div>
                                        <h3 className="text-white text-2xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-white/80 max-w-md">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Feature indicators */}
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {features.map((feature, index) => (
                                <button
                                    key={feature.id}
                                    className={cn(
                                        "w-8 h-1 rounded-full transition-all duration-300",
                                        activeFeature === index ? `bg-gradient-to-r ${feature.color}` : "bg-slate-300 hover:bg-slate-400",
                                    )}
                                    onClick={() => setActiveFeature(index)}
                                    aria-label={`View ${feature.title} feature`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats section */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { value: "100%", label: "Authentic Products" },
                        { value: "24/7", label: "Blockchain Verification" },
                        { value: "5,000+", label: "Verified Sellers" },
                        { value: "₦10M+", label: "Daily Transactions" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-amber-500">
                                {stat.value}
                            </div>
                            <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

