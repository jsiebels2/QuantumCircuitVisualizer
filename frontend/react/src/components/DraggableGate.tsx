import { useDraggable } from "@dnd-kit/core";

interface Props {
  gateType: string;
  label: string;
  description: string;
}

export default function DraggableGate({ gateType, label, description }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: gateType,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-3 px-3 py-2 rounded cursor-grab active:cursor-grabbing
        border border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50
        transition-colors select-none
        ${isDragging ? "opacity-40" : "opacity-100"}
      `}
    >
      <span className="w-8 h-8 flex items-center justify-center rounded bg-violet-100 text-violet-700 text-xs font-bold">
        {label}
      </span>
      <span className="text-xs text-gray-500">{description}</span>
    </div>
  );
}
