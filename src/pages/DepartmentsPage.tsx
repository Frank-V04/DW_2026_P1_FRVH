import { useState, useEffect, useCallback } from 'react';
import type { Department, DepartmentStatus, CreateDepartmentDto } from '../types';
import { mockDepartments } from '../utils/mockData';
import DepartmentCard from '../components/DepartmentCard';
import StatsBadge from '../components/StatsBadge';
import FormField from '../components/FormField';

function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filtros
  const [search, setSearch] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<DepartmentStatus | ''>('');

  // Formulario
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formNombre, setFormNombre] = useState<string>('');
  const [formEncargado, setFormEncargado] = useState<string>('');
  const [formCantidad, setFormCantidad] = useState<string>('');
  const [formPresupuesto, setFormPresupuesto] = useState<string>('');
  const [formUbicacion, setFormUbicacion] = useState<string>('');
  const [formEstado, setFormEstado] = useState<DepartmentStatus>('active');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDepartments(mockDepartments);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredDepartments = departments.filter(dep => {
    const matchesSearch = dep.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !selectedStatus || dep.estado === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(d => d.estado === 'active').length;
  const inactiveDepartments = departments.filter(d => d.estado === 'inactive').length;

  const resetForm = () => {
    setFormNombre(''); setFormEncargado(''); setFormCantidad('');
    setFormPresupuesto(''); setFormUbicacion(''); setFormEstado('active');
    setEditingId(null); setShowForm(false);
  };

  const handleSave = useCallback(() => {
    if (!formNombre.trim() || !formEncargado.trim() || !formUbicacion.trim()) return;

    const dto: CreateDepartmentDto = {
      nombre: formNombre.trim(),
      encargado: formEncargado.trim(),
      cantidadEmpleados: Number(formCantidad) || 0,
      presupuesto: Number(formPresupuesto) || 0,
      ubicacion: formUbicacion.trim(),
      estado: formEstado,
    };

    if (editingId !== null) {
      setDepartments(prev => prev.map(d => d.id === editingId ? { ...d, ...dto } : d));
    } else {
      setDepartments(prev => [...prev, { id: Date.now(), ...dto }]);
    }
    resetForm();
  }, [formNombre, formEncargado, formCantidad, formPresupuesto, formUbicacion, formEstado, editingId]);

  const handleEdit = useCallback((department: Department) => {
    setEditingId(department.id);
    setFormNombre(department.nombre);
    setFormEncargado(department.encargado);
    setFormCantidad(String(department.cantidadEmpleados));
    setFormPresupuesto(String(department.presupuesto));
    setFormUbicacion(department.ubicacion);
    setFormEstado(department.estado);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    if (!confirm('¿Estás seguro de eliminar este departamento?')) return;
    setDepartments(prev => prev.filter(d => d.id !== id));
  }, []);

  const inputStyle = {
    padding: '8px 12px', border: '1px solid #cbd5e1',
    borderRadius: '6px', fontSize: '14px', color: '#1e293b',
    background: 'white', width: '100%', boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Encabezado */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Gestión de Departamentos</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>
            {filteredDepartments.length} de {departments.length} departamentos
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          style={{ padding: '8px 16px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
        >
          + Agregar departamento
        </button>
      </div>

      {/* Estadísticas */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatsBadge label="Total de departamentos" value={totalDepartments} color="#2563eb" />
        <StatsBadge label="Departamentos activos" value={activeDepartments} color="#16a34a" />
        <StatsBadge label="Departamentos inactivos" value={inactiveDepartments} color="#d44444" />
      </div>

      {/* Formulario */}
      {showForm && (
        <div style={{ padding: '16px', marginBottom: '24px', background: 'white', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#1e293b' }}>
            {editingId !== null ? 'Editar departamento' : 'Nuevo departamento'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <FormField label="Nombre *">
              <input type="text" value={formNombre} onChange={e => setFormNombre(e.target.value)} placeholder="Ej. Marketing" autoFocus style={inputStyle} />
            </FormField>
            <FormField label="Encargado *">
              <input type="text" value={formEncargado} onChange={e => setFormEncargado(e.target.value)} placeholder="Ej. Juan Pérez" style={inputStyle} />
            </FormField>
            <FormField label="Cantidad de empleados">
              <input type="number" min="0" value={formCantidad} onChange={e => setFormCantidad(e.target.value)} placeholder="Ej. 10" style={inputStyle} />
            </FormField>
            <FormField label="Presupuesto">
              <input type="number" min="0" value={formPresupuesto} onChange={e => setFormPresupuesto(e.target.value)} placeholder="Ej. 50000" style={inputStyle} />
            </FormField>
            <FormField label="Ubicación *">
              <input type="text" value={formUbicacion} onChange={e => setFormUbicacion(e.target.value)} placeholder="Ej. Edificio A - Piso 2" style={inputStyle} />
            </FormField>
            <FormField label="Estado *">
              <select value={formEstado} onChange={e => setFormEstado(e.target.value as DepartmentStatus)} style={inputStyle}>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSave} style={{ padding: '8px 16px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Guardar
            </button>
            <button onClick={resetForm} style={{ padding: '8px 16px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '24px', padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <FormField label="Buscar" style={{ flex: '1', minWidth: '220px' }}>
          <input
            type="text" placeholder="Buscar por nombre..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white' }}
          />
        </FormField>
        <FormField label="Estado" style={{ minWidth: '160px' }}>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value as DepartmentStatus | '')}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white' }}>
            <option value="">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </FormField>
        {(search || selectedStatus) && (
          <button onClick={() => { setSearch(''); setSelectedStatus(''); }}
            style={{ padding: '8px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
          <p>Cargando departamentos...</p>
        </div>
      )}

      {/* Sin resultados */}
      {!loading && filteredDepartments.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
          <p>No se encontraron departamentos con los filtros aplicados.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && filteredDepartments.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {filteredDepartments.map(dep => (
            <DepartmentCard key={dep.id} department={dep} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DepartmentsPage;