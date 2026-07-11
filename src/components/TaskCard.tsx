import { useState } from 'react';
import type { Task, TaskStatus } from '../types';
import { KANBAN_COLUMNS } from '../config/kanban';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      // 🛠️ PUNTO 8: Habilitamos que la tarjeta sea arrastrable
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
      }}
      className={`bg-white rounded-lg border border-slate-200 p-3 shadow-sm
                  transition cursor-grab active:cursor-grabbing
                  ${hovered ? 'shadow-md border-slate-300' : ''} relative group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 🛠️ PUNTO 7: Botón eliminar mejorado (Ahora es visible y se nota que es para borrar) */}
      <button
        onClick={() => onDelete(task.id)}
        className="absolute top-2 right-2 text-slate-400 hover:text-red-600 
                   bg-slate-50 hover:bg-red-50 rounded-md w-6 h-6 flex items-center justify-center
                   transition text-sm font-bold"
        title="Eliminar tarea"
      >
        ×
      </button>

      <p className="font-medium text-slate-800 text-sm pr-6 mb-1">{task.title}</p>

      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-2">
        {task.assignee ? (
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {task.assignee.name}
          </span>
        ) : <span />}

        {(task._count?.comments ?? 0) > 0 && (
          <span className="text-xs text-slate-400">
            💬 {task._count?.comments}
          </span>
        )}
      </div>

      {/* Selector de estado */}
      <select
        value={task.status}
        onChange={e => onStatusChange(task.id, e.target.value as TaskStatus)}
        onClick={e => e.stopPropagation()}
        className="mt-2 w-full text-xs border border-slate-200 rounded px-2 py-1
                   text-slate-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        {KANBAN_COLUMNS.map(col => (
          <option key={col.id} value={col.id}>{col.label}</option>
        ))}
      </select>
    </div>
  );
}