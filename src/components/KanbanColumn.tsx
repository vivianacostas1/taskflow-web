import type { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import type { KanbanColumnConfig } from '../config/kanban';

interface KanbanColumnProps {
  config: KanbanColumnConfig;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onAddTask?: () => void;
}

export function KanbanColumn({ config, tasks, onStatusChange, onDelete, onAddTask }: KanbanColumnProps) {
  return (
    <div 
      // 🛠️ PUNTO 8: Permitimos recibir y soltar las tarjetas arrastradas en esta columna
      onDragOver={(e) => e.preventDefault()} // Obligatorio para habilitar el drop
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData('text/plain');
        if (taskId) {
          onStatusChange(taskId, config.id as TaskStatus);
        }
      }}
      className={`flex flex-col rounded-xl ${config.bgColor} min-h-[400px] p-3 transition-colors`}
    >
      {/* Encabezado de columna */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
          <span className="text-sm font-semibold text-slate-700">{config.label}</span>
          <span className="text-xs bg-white text-slate-500 px-1.5 py-0.5 rounded-full border">
            {tasks.length}
          </span>
        </div>
        {onAddTask && config.id === 'TODO' && (
          <button onClick={onAddTask}
            className="text-slate-400 hover:text-blue-600 text-lg leading-none transition">
            +
          </button>
        )}
      </div>

      {/* Tareas */}
      <div className="flex flex-col gap-2 flex-1">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-slate-300 text-xs built-in-empty">
            Sin tareas
          </div>
        )}
      </div>
    </div>
  );
}