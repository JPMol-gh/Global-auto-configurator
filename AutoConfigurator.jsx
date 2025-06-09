
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function AutoConfigurator() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [useCase, setUseCase] = useState([]);
  const [features, setFeatures] = useState([]);
  const [result, setResult] = useState(null);

  const toggleItem = (list, setList, value) => {
    setList(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  const handleSubmit = () => {
    const advies = `Op basis van jouw locatie (${location}), budget (${budget}), voorkeur voor ${fuelType},
gebruik (${useCase.join(", ")}) en extra wensen (${features.join(", ")}) bevelen wij een compacte hybride of elektrische auto aan
met moderne functies zoals navigatie en parkeersensoren.`;
    setResult(advies);
  };

  return (
    <motion.div className="max-w-3xl mx-auto p-4 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">🌍 Locatiegegevens</h2>
          <Input placeholder="Land / Stad" value={location} onChange={e => setLocation(e.target.value)} />

          <h2 className="text-xl font-semibold">💰 Budget</h2>
          <Select onValueChange={setBudget}>
            <SelectTrigger><SelectValue placeholder="Kies budget" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Tot €10.000</SelectItem>
              <SelectItem value="mid">€10.000 – €30.000</SelectItem>
              <SelectItem value="high">Meer dan €30.000</SelectItem>
            </SelectContent>
          </Select>

          <h2 className="text-xl font-semibold">🛢️ Brandstoftype</h2>
          <Select onValueChange={setFuelType}>
            <SelectTrigger><SelectValue placeholder="Kies brandstoftype" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="benzine">Benzine</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hybride">Hybride</SelectItem>
              <SelectItem value="elektrisch">Elektrisch</SelectItem>
              <SelectItem value="geen">Geen voorkeur</SelectItem>
            </SelectContent>
          </Select>

          <h2 className="text-xl font-semibold">🧭 Gebruik</h2>
          {["Stadsritten", "Woon-werkverkeer", "Lange ritten", "Gezin", "Offroad"].map(item => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox checked={useCase.includes(item)} onCheckedChange={() => toggleItem(useCase, setUseCase, item)} />
              <label>{item}</label>
            </div>
          ))}

          <h2 className="text-xl font-semibold">📦 Extra wensen</h2>
          {["Parkeersensoren", "Navigatie", "Cruise control", "Stoelverwarming", "Trekhaak"].map(item => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox checked={features.includes(item)} onCheckedChange={() => toggleItem(features, setFeatures, item)} />
              <label>{item}</label>
            </div>
          ))}

          <Button className="mt-4 w-full" onClick={handleSubmit}>🚗 Toon advies</Button>

          {result && (
            <div className="mt-6 p-4 bg-white border rounded shadow">
              <h3 className="text-lg font-bold mb-2">🔍 Persoonlijk auto-advies</h3>
              <p>{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
