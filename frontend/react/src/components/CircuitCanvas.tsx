import { useCircuitStore } from "../store/circuitStore"
import QubitWire from "./QubitWire"
import AddQubitButton from "./AddQubitButton"
 
const COLUMNS = 8
 
export default function CircuitCanvas() {
  const { numQubits } = useCircuitStore()
 
  return (
    <main className="flex-1 p-6 overflow-auto">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Circuit
      </h2>
      <div className="inline-block">
        {Array.from({ length: numQubits }, (_, q) => (
          <QubitWire key={q} qubitIndex={q} columns={COLUMNS} />
        ))}
        <AddQubitButton />
      </div>
    </main>
  )
}
 
