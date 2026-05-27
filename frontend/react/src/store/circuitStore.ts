import { create } from "zustand";
import type { Gate, StatevectorEntry } from "../types/circuits";
import { simulate } from "../api/simulate";

const MAX_QUBITS = 5;

interface CircuitStore {
  numQubits: number;
  gates: Gate[];
  statevector: StatevectorEntry[];
  isLoading: boolean;
  error: string | null;
  addGate: (gate: Gate) => Promise<void>;
  removeGate: (id: string) => Promise<void>;
  incrementQubits: () => void;
}

export const useCircuitStore = create<CircuitStore>((set, get) => ({
  numQubits: 2,
  gates: [],
  statevector: [],
  isLoading: false,
  error: null,

  addGate: async (gate) => {
    // Replace any existing gate at the same slot
    const existing = get().gates.filter(
      (g) => !(g.column === gate.column && ("qubit" in g ? g.qubit : g.control) === ("qubit" in gate ? gate.qubit : gate.control))
    );
    const gates = [...existing, gate];
    set({ gates, isLoading: true, error: null });
    try {
      const statevector = await simulate({ numQubits: get().numQubits, gates });
      set({ statevector });
    } catch (e) {
      set({ error: (e as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  removeGate: async (id) => {
    const gates = get().gates.filter((g) => g.id !== id);
    set({ gates, isLoading: true, error: null });
    try {
      const statevector = await simulate({ numQubits: get().numQubits, gates });
      set({ statevector });
    } catch (e) {
      set({ error: (e as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  incrementQubits: () => {
    const next = get().numQubits + 1;
    if (next <= MAX_QUBITS) set({ numQubits: next });
  },
}));
