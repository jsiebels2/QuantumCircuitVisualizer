import DraggableGate from "./DraggableGate";

const GATES = [
  { gateType: "h",  label: "H",    description: "Hadamard — superposition" },
  { gateType: "x",  label: "X",    description: "Pauli-X — bit flip" },
  { gateType: "cx", label: "CX",   description: "CNOT — entanglement" },
  { gateType: "rz", label: "RZ",   description: "Z-rotation (π/2)" },
];

export default function GatePalette() {
  return (
    <aside className="w-48 flex-shrink-0 border-r border-gray-100 p-4">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Gates
      </h2>
      <div className="flex flex-col gap-2">
        {GATES.map((g) => (
          <DraggableGate key={g.gateType} {...g} />
        ))}
      </div>
    </aside>
  );
}
