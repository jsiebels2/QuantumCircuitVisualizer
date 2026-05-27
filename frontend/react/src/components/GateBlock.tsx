import { useCircuitStore } from "../store/circuitStore";
import type { Gate } from "../types/circuits";

interface Props {
  gate: Gate;
}

const GATE_COLORS: Record<string, string> = {
  h:  "bg-violet-500",
  x:  "bg-rose-500",
  cx: "bg-amber-500",
  rz: "bg-teal-500",
};

export default function GateBlock({ gate }: Props) {
  const removeGate = useCircuitStore((s) => s.removeGate);

  return (
    <div
      onClick={() => removeGate(gate.id)}
      title="Click to remove"
      className={`
        w-10 h-10 flex items-center justify-center rounded
        text-white text-xs font-bold cursor-pointer select-none
        hover:opacity-70 transition-opacity
        ${GATE_COLORS[gate.gate] ?? "bg-gray-500"}
      `}
    >
      {gate.gate.toUpperCase()}
    </div>
  );
}
