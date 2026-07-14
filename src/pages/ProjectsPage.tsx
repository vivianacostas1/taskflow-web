
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../api/projects.service';
import type { Project } from '../types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [showModal,setShowModal]= useState(false);
  const [name,      setName]     = useState('');
  const [desc,      setDesc]     = useState('');
  const [creating, setCreating] = useState(false);

  const { user } = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    projectsService.getAll()
      .then(setProjects)
      .catch(() => setError('No se pudieron cargar los proyectos'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim()) return;
    setCreating(true);
    try {
      const newProject = await projectsService.create({
        name: name.trim(), description: desc.trim() || undefined,
        ownerId: user.id,
      });
      setProjects(prev => [newProject, ...prev]);
      setShowModal(false);
      setName(''); setDesc('');
    } catch {
      setError('Error al crear el proyecto');
    } finally { setCreating(false); }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">TaskFlow — Proyectos</h1>
        <button onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm
                     font-medium px-4 py-2 rounded-lg transition">
          + Nuevo Proyecto
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {loading && <div className="text-center py-12 text-slate-500">Cargando...</div>}
        {error   && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}

        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-slate-500 text-lg">Aún no tienes proyectos.</p>
            <button onClick={() => setShowModal(true)}
              className="mt-4 text-blue-600 font-medium hover:underline">
              Crea tu primer proyecto →
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id}
              onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              className="bg-white rounded-xl border border-slate-200 p-5
                         hover:shadow-md hover:border-blue-300 cursor-pointer transition">
              <h2 className="font-semibold text-slate-800 mb-1 truncate">{project.name}</h2>
              {project.description && (
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{project.description}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
                <span className="bg-slate-100 px-2 py-1 rounded-full">
                  {project._count?.tasks ?? 0} tareas
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal crear proyecto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Nuevo Proyecto</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="pname" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre *
                </label>
                <input id="pname" required value={name} onChange={e=>setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="pdesc" className="block text-sm font-medium text-slate-700 mb-1">
                  Descripción
                </label>
                <textarea id="pdesc" value={desc} onChange={e=>setDesc(e.target.value)} rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setName(''); setDesc(''); }}
                  className="text-slate-600 hover:text-slate-800 text-sm font-medium px-4 py-2">
                  Cancelar
                </button>
                <button type="submit" disabled={creating}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white
                             text-sm font-semibold px-4 py-2 rounded-lg transition">
                  {creating ? 'Creando...' : 'Crear Proyecto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}