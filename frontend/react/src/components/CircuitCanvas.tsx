import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useCircuitStore } from "../store/circuitStore";
import QubitWire from "./QubitWire";
import AddQubitButton from "./AddQubitButton";
import type { Gate } from "../types/circuits";

const COLUMNS = 8;

export default function CircuitCanvas() {
  const { numQubits, addGate } = useCircuitStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    // over.id format: "qubit-{q}-col-{c}"
    const parts = (over.id as string).split("-");
    const qubit = Number(parts[1]);
    const column = Number(parts[3]);
    const gateType = active.id as string;

    const base = { id: crypto.randomUUID(), column };

    let gate: Gate;
    if (gateType === "cx") {
      const target = qubit === 0 ? 1 : qubit - 1;
      gate = { ...base, gate: "cx", control: qubit, target };
    } else if (gateType === "rz") {
      gate = { ...base, gate: "rz", qubit, angle: Math.PI / 2 };
    } else {
      gate = { ...base, gate: gateType as "h" | "x", qubit };
    }

    addGate(gate);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
}
