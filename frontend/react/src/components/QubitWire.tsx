import { useCircuitStore } from "../store/circuitStore";
import DropSlot from "./DropSlot";

interface Props {
  qubitIndex: number;
  columns: number;
}

export default function QubitWire({ qubitIndex, columns }: Props) {
  const gates = useCircuitStore((s) => s.gates);

  return (
    <div className="flex items-center gap-1 mb-2">
      <span className="w-8 text-xs font-mono text-gray-400 text-right flex-shrink-0">
        q{qubitIndex}
      </span>

      {/* Wire line with drop slots */}
      <div className="flex items-center gap-1 relative">
        {/* Background wire */}
        <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-gray-300 -z-10" />

        {Array.from({ length: columns }, (_, col) => {
          const gate = gates.find((g) => {
            if (g.column !== col) return false;
            if (g.gate === "cx") return g.control === qubitIndex || g.target === qubitIndex;
            return g.qubit === qubitIndex;
          });

          return (
            <DropSlot
              key={col}
              id={`qubit-${qubitIndex}-col-${col}`}
              gate={gate}
            />
          );
        })}
      </div>
    </div>
  );
}
