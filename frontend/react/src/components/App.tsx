import { DndContext, type DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { useState } from "react"
import GatePalette from "./GatePalette"
import CircuitCanvas from "./CircuitCanvas"
import StatevectorPanel from "./StatevectorPanel"
import { useCircuitStore } from "../store/circuitStore"
import type { Gate } from "../types/circuits"
 
export default function App() {
  const { addGate, numQubits } = useCircuitStore()
  const [activeGate, setActiveGate] = useState<string | null>(null)
 
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveGate(null)
    if (!over) return
 
    const parts = (over.id as string).split("-")
    const qubit = Number(parts[1])
    const column = Number(parts[3])
    const gateType = active.id as string
 
    const base = { id: crypto.randomUUID(), column }
    let gate: Gate
 
    if (gateType === "cx") {
      const target = qubit === 0 ? 1 : qubit - 1
      if (numQubits < 2) return
      gate = { ...base, gate: "cx", control: qubit, target }
    } else if (gateType === "rz") {
      gate = { ...base, gate: "rz", qubit, angle: Math.PI / 2 }
    } else {
      gate = { ...base, gate: gateType as "h" | "x", qubit }
    }
 
    addGate(gate)
  }
 
  return (
    <DndContext
      onDragStart={(e) => setActiveGate(e.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-white text-gray-800 font-sans overflow-hidden">
        <GatePalette />
        <CircuitCanvas />
        <StatevectorPanel />
      </div>
 
      <DragOverlay>
        {activeGate && (
          <div className="w-10 h-10 flex items-center justify-center rounded bg-violet-500 text-white text-xs font-bold shadow-lg opacity-90">
            {activeGate.toUpperCase()}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}