"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Refrigerator, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-black text-white px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl"
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-red-500/10">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-2">404</h1>

        <p className="text-xl font-semibold mb-2">
          Page not found
        </p>

        <p className="text-gray-400 mb-6">
          Your smart fridge couldn&apos;t find what you were looking for.
        </p>

        <div className="flex justify-center mb-6">
          <Refrigerator className="w-12 h-12 text-cyan-400 animate-bounce" />
        </div>
        <div className="flex gap-4 justify-center">

          <Link href="/dashboard">
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}