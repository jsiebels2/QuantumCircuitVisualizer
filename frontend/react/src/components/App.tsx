import GatePalette from "./GatePalette";
import CircuitCanvas from "./CircuitCanvas";
import StatevectorPanel from "./StatevectorPanel";

export default function App() {
  return (
    <div className="flex h-screen bg-white text-gray-800 font-sans overflow-hidden">
      <GatePalette />
      <CircuitCanvas />
      <StatevectorPanel />
    </div>
  );
}
