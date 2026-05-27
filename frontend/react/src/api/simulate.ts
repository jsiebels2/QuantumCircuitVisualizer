import type { CircuitState, StatevectorEntry } from "../types/circuits";


export async function simulate(circuit : CircuitState) : Promise<StatevectorEntry[]> {
    const viteUrl = import.meta.env.VITE_URL;

    const response = await fetch(`${viteUrl}/simulate`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(circuit)
    });

    if(!response.ok) {
        throw new Error("Simulation Failed!");
    }

    const data = await response.json();
    return data.statevector as StatevectorEntry[];
}