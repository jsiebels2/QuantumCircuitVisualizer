import { useCircuitStore } from "../store/circuitStore";

const MAX_QUBITS = 5;

export default function AddQubitButton() {
  const { numQubits, incrementQubits } = useCircuitStore();
  const atMax = numQubits >= MAX_QUBITS;

  return (
    <button
      onClick={incrementQubits}
      disabled={atMax}
      className={`
        mt-2 px-3 py-1 text-xs rounded border transition-colors
        ${atMax
          ? "border-gray-200 text-gray-300 cursor-not-allowed"
          : "border-violet-400 text-violet-600 hover:bg-violet-50 cursor-pointer"
        }
      `}
    >
      {atMax ? `Max qubits (${MAX_QUBITS})` : "+ Add qubit"}
    </button>
  );
}
