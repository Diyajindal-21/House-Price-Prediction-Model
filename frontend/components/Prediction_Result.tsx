// import { Card } from "@/components/ui/card"
"use client"
import { Check, Home } from "lucide-react"
import { useState ,useEffect} from "react"
interface PredictionResultProps {
  price: number
}

export default function PredictionResult({ price }: PredictionResultProps) {
  // Format the price in lakhs with commas
  const [formattedPrice, setFormattedPrice] = useState<string>("N/A");
  useEffect(() => {
    if (price !== undefined) {
      setFormattedPrice(price.toLocaleString("en-IN", { maximumFractionDigits: 2 }));
    }
  }, [price]);
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-500 p-3 rounded-full mr-4">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Predicted Price</h3>
            <p className="text-3xl font-bold text-blue-700">₹ {formattedPrice} Lakhs</p>
          </div>
        </div>
        <div className="bg-green-100 p-2 rounded-full">
          <Check className="h-6 w-6 text-green-600" />
        </div>
      </div>
    </div>
  )
}

