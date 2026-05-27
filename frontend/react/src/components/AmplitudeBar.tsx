import type { StatevectorEntry } from "../types/circuits";

interface Props {
  entry: StatevectorEntry;
  numQubits: number;
}

export default function AmplitudeBar({ entry, numQubits }: Props) {
  const probability = entry.re ** 2 + entry.im ** 2;
  const phase = Math.atan2(entry.im, entry.re) * (180 / Math.PI);
  const label = `|${entry.index.toString(2).padStart(numQubits, "0")}⟩`;

  // Map phase (-180 to 180) to a hue (0 to 360)
  const hue = ((phase + 180) / 360) * 360;

  return (
    <div className="flex flex-col items-center gap-1 w-12">
      <div className="w-full bg-gray-100 rounded h-24 flex items-end overflow-hidden">
        <div
          className="w-full rounded transition-all duration-300"
          style={{
            height: `${probability * 100}%`,
            backgroundColor: `hsl(${hue}, 70%, 55%)`,
          }}
        />
      </div>
      <span className="text-xs font-mono text-gray-500">{label}</span>
      <span className="text-xs text-gray-400">{(probability * 100).toFixed(1)}%</span>
    </div>
  );
}
