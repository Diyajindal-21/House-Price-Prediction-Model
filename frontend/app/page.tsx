import PredictionForm from "@/components/Prediction_Form"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "House Price Prediction",
  description: "Predict house prices based on location, area, and other features in Bangalore",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">House Price Prediction</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Get accurate house price predictions based on location, area, and other features in Bangalore using our advanced machine
          learning model.
        </p>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <PredictionForm />
        </div>
      </div>
    </div>
  )
}


