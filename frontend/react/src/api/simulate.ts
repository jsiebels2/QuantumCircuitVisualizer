// This is going to be responsible for the connection between the front and the backend. We want this to call the backend
// with the circuit information and get the statevector in response, this an aexample response from the backend:
// {
//   "statevector": [
//     {
//       "im": 0.0,
//       "index": 0,
//       "re": 0.707107
//     },
//     {
//       "im": 0.0,
//       "index": 1,
//       "re": 0.0
//     },
//     {
//       "im": 0.0,
//       "index": 2,
//       "re": 0.0
//     },
//     {
//       "im": 0.0,
//       "index": 3,
//       "re": 0.707107
//     }
//   ]
// }

import type { CircuitState, StatevectorEntry } from "../types/circuits";


export async function simulate(circuit : CircuitState) : Promise<StatevectorEntry[]> {
    const viteUrl = import.meta.env.BASE_URL;

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