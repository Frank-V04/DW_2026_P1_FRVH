import type { Department } from '../types';

interface DepartmentCardProps {
  department: Department;
  onEdit?: (department: Department) => void;
  onDelete?: (id: number) => void;
}

function DepartmentCard({ department, onEdit, onDelete }: DepartmentCardProps) {
  const { nombre, encargado, cantidadEmpleados, presupuesto, ubicacion, estado } = department;

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      background: 'white',
      minWidth: '260px',
      maxWidth: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{nombre}</h3>
        <span style={{
          background: estado === 'active' ? '#dcfce7' : '#fee2e2',
          color: estado === 'active' ? '#16a34a' : '#dc2626',
          padding: '2px 8px', borderRadius: '12px', fontSize: '12px',
        }}>
          {estado === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div style={{ fontSize: '14px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>👤 <strong>Encargado:</strong> {encargado}</span>
        <span>👥 <strong>Empleados:</strong> {cantidadEmpleados}</span>
        <span>💰 <strong>Presupuesto:</strong> Q{presupuesto.toLocaleString()}</span>
        <span>📍 <strong>Ubicación:</strong> {ubicacion}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        {onEdit && (
          <button onClick={() => onEdit(department)} style={{
            flex: 1, padding: '6px', background: '#1e40af', color: 'white',
            border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
          }}>
            Editar
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(department.id)} style={{
            flex: 1, padding: '6px', background: '#fee2e2', color: '#dc2626',
            border: '1px solid #fca5a5', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
          }}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

export default DepartmentCard;