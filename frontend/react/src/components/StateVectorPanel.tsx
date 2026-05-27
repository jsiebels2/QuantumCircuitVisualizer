import { useCircuitStore } from "../store/circuitStore";
import AmplitudeBar from "./AmplitudeBar";

export default function StatevectorPanel() {
  const { statevector, numQubits, isLoading, error } = useCircuitStore();

  return (
    <aside className="w-64 flex-shrink-0 border-l border-gray-100 p-4">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Statevector
      </h2>

      {error && (
        <p className="text-xs text-rose-500 mb-2">{error}</p>
      )}

      {isLoading && (
        <p className="text-xs text-gray-400">Simulating…</p>
      )}

      {!isLoading && statevector.length === 0 && (
        <p className="text-xs text-gray-400">Drop a gate to simulate.</p>
      )}

      {!isLoading && statevector.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {statevector.map((entry) => (
            <AmplitudeBar
              key={entry.index}
              entry={entry}
              numQubits={numQubits}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
