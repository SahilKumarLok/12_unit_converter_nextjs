"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Conversion rates for various units categorized by length, weight, and volume
const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};

// Unit types categorized by length, weight, and volume
const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};

export default function UnitConverterComponent() {
  const [inputValue, setInputValue] = useState<number | string>("");
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  // Handler for input value change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Convert the input value
  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;

      // Find unit category
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }

      // Perform conversion if units are compatible
      if (unitCategory) {
        const baseValue = parseFloat(inputValue as string) * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-blue-900 to-black">
      <div className="max-w-md w-full p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-yellow-400">
          Unit Converter
        </h1>
        <p className="text-sm mb-8 text-center text-gray-300">
          Convert values between different units.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Unit Selection */}
          <div className="space-y-2">
            <Label htmlFor="input-unit" className="text-yellow-300">
              From
            </Label>
            <Select onValueChange={setInputUnit}>
              <SelectTrigger className="bg-gray-700 text-yellow-400">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Output Unit Selection */}
          <div className="space-y-2">
            <Label htmlFor="output-unit" className="text-yellow-300">
              To
            </Label>
            <Select onValueChange={setOutputUnit}>
              <SelectTrigger className="bg-gray-700 text-yellow-400">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value Input */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="input-value" className="text-yellow-300">
              Value
            </Label>
            <Input
              id="input-value"
              type="number"
              placeholder="Enter value"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-yellow-400"
            />
          </div>

          {/* Convert Button */}
          <Button
            type="button"
            className="col-span-2 bg-yellow-600 text-white hover:bg-yellow-500"
            onClick={convertValue}
          >
            Convert
          </Button>
        </div>

        {/* Result Display */}
        <div className="mt-6 text-center">
          <div className="text-4xl font-bold text-yellow-400">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-gray-400">{outputUnit ? outputUnit : "Unit"}</div>
        </div>
      </div>
    </div>
  );
}
