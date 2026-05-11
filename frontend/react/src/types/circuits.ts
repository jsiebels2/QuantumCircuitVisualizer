export type Gate = 
    | { id: string; gate: 'h' | 'x'; qubit: number; } 
    | { id: string; gate: 'cnot'; qubit: number; control: number; target: number; } 
    | { id: string; gate: 'rz' | 'x'; qubit: number; control: number; target: number; }
