export type SingleQubitGate = {
  id: string;
  gate: "h" | "x";
  qubit: number;
  column: number;
};

export type CXGate = {
  id: string;
  gate: "cx";
  control: number;
  target: number;
  column: number;
};

export type RZGate = {
  id: string;
  gate: "rz";
  qubit: number;
  angle: number;
  column: number;
};

export type Gate = SingleQubitGate | CXGate | RZGate;

export interface CircuitState {
  numQubits: number;
  gates: Gate[];
}

export interface StatevectorEntry {
  index: number;
  re: number;
  im: number;
}