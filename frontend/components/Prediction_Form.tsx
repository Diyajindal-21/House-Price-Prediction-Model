"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import PredictionResult from "./Prediction_Result"

interface PredictionData {
  location: string
  area: string
  sqft: number
  bathroom: number
  balcony: number
  bhk: number // BHK
}

export default function PredictionForm() {
  const [locations, setLocations] = useState([])
  const [areas, setArea] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLocationsLoading, setIsLocationsLoading] = useState(true)
  const [isAreaLoading, setIsAreaLoading] = useState(true)
  const [predictionResult, setPredictionResult] = useState<number | null>(null)
  const [selectedBathroom, setSelectedBathroom] = useState<number | null>(null)
  const [selectedBalacony, setSelectedBalcony] = useState<number | null>(null)
  const [selectedBhk, setSelectedBhk] = useState<number | null>(null)
  const [formData, setFormData] = useState<PredictionData>({
    location: "",
    area: "",
    sqft: 0,
    bathroom: 0,
    balcony: 0,
    bhk: 0,
  })
  const [buttons, setButtons] = useState<number[]>([])
  useEffect(()=>{
    setButtons([1,2,3,4,5,6])
  },[])
  // Fetch locations when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/location")
        const data = await response.json()
        setLocations(data.locations)
        console.log(data)
        setIsLocationsLoading(false)
      } catch (error) {
        console.error("Error fetching locations:", error)
        setIsLocationsLoading(false)
      }
    }
    const fetchArea = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/area")
        const data = await response.json()
        setArea(data.area)
        console.log(data.area)
        setIsAreaLoading(false)
      } catch (error) {
        console.error("Error fetching area:", error)
        setIsAreaLoading(false)
      }
    }
    fetchLocations()
    fetchArea()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "location" || name==="area" ? value : Number(value),
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: name === "location" || name === "area"? value : Number(value),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setPredictionResult(null)
    console.log(formData)

    try {
      const response = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log(data)
      setPredictionResult(data.price)
    } catch (error) {
      console.error("Error predicting price:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="location">Location: </label>
            {!isLocationsLoading && locations.length > 0 && (
            <select className="border border-1 rounded-lg border-gray-600" onChange={(e) => handleSelectChange("location", e.target.value)}>
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="area">Area: </label>
            {!isAreaLoading && areas.length > 0 && (
            <select className="border border-1 rounded-lg border-gray-600" onChange={(e) => handleSelectChange("area", e.target.value)}>
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="sqft">Square Feet: </label>
            <div>
                <input className="border border-1 border-gray-600" id="sqft" name="sqft" type="number" min="0" step="0.1" required onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bathroom">Bathrooms: </label>
            <div className="flex">
                {buttons.map((num) => (
                <button
                    key={num}
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedBathroom(num)
                      handleSelectChange("bathroom", num.toString())
                    }}
                    className={`px-4 py-2 border border-gray-300 text-gray-700 transition-all first:rounded-l-md last:rounded-r-md ${selectedBathroom === num ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}>
                    {num}
                </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="balcony">Balconies: </label>
            <div className="flex">
                {buttons.map((num) => (
                <button
                    key={num}
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedBalcony(num)
                      handleSelectChange("balcony", num.toString())
                    }}
                    className={`px-4 py-2 border border-gray-300 text-gray-700 transition-all first:rounded-l-md last:rounded-r-md ${selectedBalacony === num ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}>
                    {num}
                </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bhk">Size(in BHK): </label>
            <div className="flex">
                {buttons.map((num) => (
                <button
                    key={num}
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedBhk(num)
                      handleSelectChange("bhk", num.toString())
                    }}
                    className={`px-4 py-2 border border-gray-300 text-gray-700 transition-all first:rounded-l-md last:rounded-r-md ${selectedBhk === num ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}>
                    {num}
                </button>
                ))}
            </div>
          </div>
        <div className="justify-items-center flex items-center justify-center">
        <button type="submit" className="bg-gray-100 hover:bg-gray-200 p-2 pl-3 pr-3" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="mr-2 animate-spin" />
              Predicting...
            </div>
          ) : (
            <div className="">
                Predict Price
            </div>
          )}
        </button>
        </div>
        </div>
      </form>

      {predictionResult !== null && (
        <div className="mt-8">
          <PredictionResult price={predictionResult} />
        </div>
      )}
    </div>
  )
}

