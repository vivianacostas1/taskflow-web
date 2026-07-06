import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
 
export default function DashboardPage() { 
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 
 
  const handleLogout = () => { 
    logout(); 
    navigate('/login', { replace: true }); 
  }; 

  // Estado local simulado para mostrar tareas en lo que las conectas a tu base de datos
  const [tasks, setTasks] = useState([
     ]);

  // Cálculos rápidos para tus tarjetas de métricas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completado').length;
  const inProgressTasks = tasks.filter(t => t.status === 'En progreso').length;

  return ( 
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden"> 
      
      {/* MENÚ LATERAL IZQUIERDO (SIDEBAR) */}
      <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col justify-between p-6">
        <div>
          {/* Logo del proyecto */}
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Task<span className="text-indigo-400">Flow</span></span>
          </div>

          {/* Opciones de Navegación */}
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white font-semibold text-left transition-all">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" />
              </svg>
              Mi Panel
            </button>
          </nav>
        </div>

        {/* Pequeño indicador del estado del Token (Rediseñado y discreto) */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sesión Persistente
          </div>
          Token activo de forma segura en tu navegador.
        </div>
      </aside>

      {/* ÁREA CENTRAL PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-y-auto p-8"> 
        
        {/* ENCABEZADO DE LA PÁGINA */}
        <header className="flex items-center justify-between bg-[#0f172a] border border-slate-800 rounded-2xl px-6 py-4 mb-8 shadow-sm"> 
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              ¡Bienvenido, <span className="text-indigo-400">{user?.name || 'Usuario'}</span>! 🎉
            </h1> 
            <p className="text-xs text-slate-400">
              Conectado como: <span className="text-slate-300 font-medium">{user?.email}</span>
            </p>
          </div>

          <button onClick={handleLogout} 
            className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-red-950/30 hover:text-red-400 text-slate-300 px-4 py-2 rounded-xl border border-slate-700 hover:border-red-900/30 transition-all font-semibold"> 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión 
          </button> 
        </header> 

        {/* TARJETAS DE MÉTRICAS RÁPIDAS (KPIs) */}
        
        {/* LISTADO DE TAREAS */}
        <section className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 bg-[#1e293b]/20 flex justify-between items-center">
            <h2 className="text-base font-bold text-white">Flujo de Trabajo Actual</h2>
                      </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161f32]/40 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Título de la Tarea</th>
                  <th className="py-4 px-6">Prioridad</th>
                  <th className="py-4 px-6">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-800/20 transition-all">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-white text-sm">{task.title}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        task.priority === 'Alta' 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : task.priority === 'Media'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${
                        task.status === 'Completado'
                          ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
                          : task.status === 'En progreso'
                          ? 'bg-amber-500/5 border-amber-500/30 text-amber-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}>
                        {task.status === 'Completado' ? '✅ ' : task.status === 'En progreso' ? '⚡ ' : '⏳ '}
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main> 
    </div> 
  ); 
}