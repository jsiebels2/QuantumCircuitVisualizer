import { useDroppable } from "@dnd-kit/core";
import GateBlock from "./GateBlock";
import type { Gate } from "../types/circuits";

interface Props {
  id: string;
  gate?: Gate;
}

export default function DropSlot({ id, gate }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`
        w-12 h-12 flex items-center justify-center
        border rounded transition-colors
        ${isOver
          ? "border-violet-400 bg-violet-50"
          : "border-dashed border-gray-300 bg-transparent"
        }
      `}
    >
      {gate && <GateBlock gate={gate} />}
    </div>
  );
}
